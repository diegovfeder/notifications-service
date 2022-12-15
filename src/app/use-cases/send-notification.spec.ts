import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification, SendNotificationRequest } from './send-notification';

describe('send-notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const request: SendNotificationRequest = {
      recipientId: '1234567890',
      content: 'You have a new notification',
      category: 'new-notification',
    };

    const { notification } = await sendNotification.execute(request);

    expect(notification).toBeTruthy();
    expect(notification.category).toBe('new-notification');
    expect(notification.content.value).toBe('You have a new notification');
    expect(notification.recipientId).toBe('1234567890');
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
