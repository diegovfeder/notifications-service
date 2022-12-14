import { Content } from './notification.content';
import { Notification } from './notification';

describe('notification', () => {
  it('should be able to create a notification', () => {
    const content = new Content('You have a new notification');
    const notification = Notification.create({
      category: 'new-notification',
      content,
      createdAt: new Date(),
      recipientId: '1234567890',
    });

    expect(notification).toBeTruthy();
  });
});
