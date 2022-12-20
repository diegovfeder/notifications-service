import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/notification.content';
import { InMemoryNotificationsRepository } from './in-memory-notifications.repository';

describe('InMemoryNotificationsRepository', () => {
  let repository: InMemoryNotificationsRepository;

  beforeEach(() => {
    repository = new InMemoryNotificationsRepository();
  });

  describe('create', () => {
    it('should add the notification to the repository', async () => {
      const notification = new Notification({
        category: '1',
        content: new Content('test that passes'),
        recipientId: '1',
      });
      await repository.create(notification);
      expect(repository.notifications).toContain(notification);
    });
  });

  describe('delete', () => {
    it('should throw an error', async () => {
      try {
        await repository.delete('1');
      } catch (error: Error | any) {
        expect(error.message).toBe('Method not implemented.');
      }
    });
  });

  describe('findById', () => {
    it('should return the notification', async () => {
      const notification = new Notification({
        category: '1',
        content: new Content('test that passes'),
        recipientId: '1',
      });
      await repository.create(notification);
      const foundNotification = await repository.findById(notification.id);
      expect(foundNotification).toEqual(notification);
    });
  });

  describe('save', () => {
    it('should save the notification', async () => {
      const notification = new Notification({
        category: '1',
        content: new Content('test that passes'),
        recipientId: '1',
      });
      await repository.create(notification);
      expect(repository.notifications).toContain(notification);
    });
  });

  describe('countManyByRecipientId', () => {
    it('should return the total count of notifications from a given recipient as 1', async () => {
      const notification = new Notification({
        category: '1',
        content: new Content('test that passes'),
        recipientId: '1',
      });
      await repository.create(notification);
      const count = await repository.countManyByRecipientId('1');
      expect(count).toBe(1);
    });

    it('should return the total count of notifications from a given recipient as 3', async () => {
      const notification = new Notification({
        category: '1',
        content: new Content('test that passes'),
        recipientId: '1',
      });
      await repository.create(notification);
      await repository.create(notification);
      await repository.create(notification);
      const count = await repository.countManyByRecipientId('1');
      expect(count).toBe(3);
    });
  });
});
