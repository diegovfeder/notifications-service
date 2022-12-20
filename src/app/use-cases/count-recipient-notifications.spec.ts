import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('count-recipient-notifications', () => {
  it('should be able to count total notifications from a given recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    expect(notificationsRepository.notifications).toHaveLength(3);

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBe(2);
  });
});
