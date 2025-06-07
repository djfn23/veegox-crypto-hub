
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
    // Écouter les notifications temps réel
    this.setupRealtimeSubscription();
    
    // Charger les notifications existantes
    await this.loadNotifications();
  }

  private setupRealtimeSubscription() {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications'
        },
        (payload) => {
          const notification = this.mapDbNotification(payload.new);
          this.addNotification(notification);
          this.showToast(notification);
        }
      )
      .subscribe();
  }

  private async loadNotifications() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      this.notifications = data?.map(this.mapDbNotification) || [];
      this.notifyListeners();
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  private mapDbNotification(dbNotification: any): Notification {
    return {
      id: dbNotification.id,
      title: dbNotification.title,
      message: dbNotification.message,
      type: dbNotification.type,
      timestamp: new Date(dbNotification.created_at),
      read: dbNotification.read,
      actionUrl: dbNotification.action_url,
      metadata: dbNotification.metadata
    };
  }

  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: 'success' | 'warning' | 'error' | 'info',
    actionUrl?: string,
    metadata?: any
  ) {
    try {
      const { data, error } = await supabase
        .from('user_notifications')
        .insert({
          user_id: userId,
          title,
          message,
          type,
          action_url: actionUrl,
          metadata
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
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
    try {
      await supabase
        .from('user_notifications')
        .update({ read: true })
        .eq('id', notificationId);

      const index = this.notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        this.notifications[index].read = true;
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
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

  // Notifications prédéfinies pour événements communs
  async notifyTransactionSuccess(userId: string, txHash: string, type: string) {
    await this.createNotification(
      userId,
      'Transaction réussie',
      `Votre ${type} a été confirmé sur la blockchain`,
      'success',
      `/transactions/${txHash}`,
      { txHash, type }
    );
  }

  async notifyTransactionFailed(userId: string, txHash: string, error: string) {
    await this.createNotification(
      userId,
      'Transaction échouée',
      `Erreur: ${error}`,
      'error',
      undefined,
      { txHash, error }
    );
  }

  async notifyPriceAlert(userId: string, token: string, price: number, threshold: number) {
    await this.createNotification(
      userId,
      'Alerte prix',
      `${token} a atteint ${price}$ (seuil: ${threshold}$)`,
      'warning',
      `/trading?token=${token}`,
      { token, price, threshold }
    );
  }
}

export const notificationService = NotificationService.getInstance();
