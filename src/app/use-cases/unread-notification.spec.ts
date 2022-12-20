import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { UnreadNotification } from './unread-notification';

describe('unread-notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationsRepository.create(notification);

    const useUnreadNotification = new UnreadNotification(
      notificationsRepository,
    );

    const { notificationId } = await useUnreadNotification.execute({
      id: notification.id,
    });

    expect(notificationId).toBeTruthy();
    expect(notificationId).toEqual(notification.id);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0].readAt).toBe(null);
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    await notificationsRepository.create(makeNotification());

    const useUnreadNotification = new UnreadNotification(
      notificationsRepository,
    );

    await expect(
      useUnreadNotification.execute({ id: 'fake-and-wrong-id' }),
    ).rejects.toThrow('Notification with id fake-and-wrong-id not found');
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
