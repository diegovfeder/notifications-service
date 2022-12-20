import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '@app/entities/notification.content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: 'any_recipient_id',
    content: new Content('any_content'),
    category: 'any_category',
    readAt: new Date(),
    ...override,
  });
}
