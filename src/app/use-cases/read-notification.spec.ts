import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { ReadNotification } from './read-notification';

describe('read-notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    const useReadNotification = new ReadNotification(notificationsRepository);

    const { notificationId } = await useReadNotification.execute({
      id: notification.id,
    });

    expect(notificationId).toBeTruthy();
    expect(notificationId).toEqual(notification.id);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    await notificationsRepository.create(makeNotification());

    const readNotification = new ReadNotification(notificationsRepository);

    await expect(
      readNotification.execute({ id: 'fake-and-wrong-id' }),
    ).rejects.toThrow('Notification with id fake-and-wrong-id not found');
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
