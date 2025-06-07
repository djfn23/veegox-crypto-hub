
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
}

export class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  static getInstance(): NotificationService {
    if (!this.instance) {
      this.instance = new NotificationService();
    }
    return this.instance;
  }

  async initialize() {
    // Simuler des notifications pour le moment
    this.notifications = [
      {
        id: '1',
        title: 'Transaction réussie',
        message: 'Votre swap a été confirmé sur la blockchain',
        type: 'success',
        timestamp: new Date(),
        read: false,
        actionUrl: '/trading'
      },
      {
        id: '2',
        title: 'Nouvelle proposition DAO',
        message: 'Une nouvelle proposition de gouvernance est disponible',
        type: 'info',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        actionUrl: '/governance'
      }
    ];
    this.notifyListeners();
  }

  async createNotification(
    title: string,
    message: string,
    type: 'success' | 'warning' | 'error' | 'info',
    actionUrl?: string,
    metadata?: any
  ) {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
      actionUrl,
      metadata
    };

    this.addNotification(notification);
    this.showToast(notification);
    return notification;
  }

  private addNotification(notification: Notification) {
    this.notifications.unshift(notification);
    this.notifyListeners();
  }

  private showToast(notification: Notification) {
    switch (notification.type) {
      case 'success':
        toast.success(notification.title, { description: notification.message });
        break;
      case 'warning':
        toast.warning(notification.title, { description: notification.message });
        break;
      case 'error':
        toast.error(notification.title, { description: notification.message });
        break;
      default:
        toast.info(notification.title, { description: notification.message });
    }
  }

  async markAsRead(notificationId: string) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      this.notifications[index].read = true;
      this.notifyListeners();
    }
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  subscribe(callback: (notifications: Notification[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Notifications prédéfinies
  async notifyTransactionSuccess(txHash: string, type: string) {
    await this.createNotification(
      'Transaction réussie',
      `Votre ${type} a été confirmé sur la blockchain`,
      'success',
      `/transactions/${txHash}`,
      { txHash, type }
    );
  }

  async notifyTransactionFailed(error: string) {
    await this.createNotification(
      'Transaction échouée',
      `Erreur: ${error}`,
      'error'
    );
  }

  async notifyPriceAlert(token: string, price: number, threshold: number) {
    await this.createNotification(
      'Alerte prix',
      `${token} a atteint ${price}$ (seuil: ${threshold}$)`,
      'warning',
      `/trading?token=${token}`,
      { token, price, threshold }
    );
  }
}

export const notificationService = NotificationService.getInstance();
