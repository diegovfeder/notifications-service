import { Content } from './notification.content';

describe('notification.content', () => {
  it('should create a notification content', () => {
    const content = new Content('You have a new notification');

    expect(content.value).toBeTruthy();
    expect(content.value).toBe('You have a new notification');
  });

  it('should not create a notification content with less than 5 characters', () => {
    expect(() => new Content('less')).toThrow();
  });

  it('should not create a notification content with more than 255 characters', () => {
    expect(() => new Content('0'.repeat(256))).toThrow();
  });
});
