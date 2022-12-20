import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/notification.content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotification } from './cancel-notification';

describe('cancel-notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    expect(notification).toBeTruthy();
    expect(notification.category).toBe('any_category');
    expect(notification.content.value).toBe('any_content');
    expect(notificationsRepository.notifications).toHaveLength(1);

    const useCancelNotification = new CancelNotification(
      notificationsRepository,
    );

    const { notificationId } = await useCancelNotification.execute({
      id: notification.id,
    });

    expect(notificationId).toBeTruthy();
    expect(notificationId).toEqual(notification.id);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = new Notification({
      recipientId: '1234567890',
      content: new Content('You have a new notification'),
      category: 'new-notification',
    });

    await notificationsRepository.create(notification);

    expect(notification).toBeTruthy();
    expect(notification.category).toBe('new-notification');
    expect(notification.content.value).toBe('You have a new notification');
    expect(notificationsRepository.notifications).toHaveLength(1);

    const useCancelNotification = new CancelNotification(
      notificationsRepository,
    );

    await expect(
      useCancelNotification.execute({ id: 'fake-and-wrong-id' }),
    ).rejects.toThrow('Notification with id fake-and-wrong-id not found');
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
