import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('get-recipient-notifications', () => {
  it('should be able to get notifications from a given recipient', async () => {
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

    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
