import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification.content';
import { NotificationsRepository } from '../repositories/notifications-repository';

export interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
