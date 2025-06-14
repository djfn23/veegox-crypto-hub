import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionLabel?: string;
}

export const NotificationCenter = () => {
  const { user } = useUnifiedAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demo
  useEffect(() => {
    if (user) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Prêt approuvé',
          message: 'Votre demande de prêt de 1000 USDC a été approuvée.',
          type: 'success',
          read: false,
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          actionUrl: '/credit',
          actionLabel: 'Voir détails'
        },
        {
          id: '2',
          title: 'Liquidation proche',
          message: 'Votre position risque d\'être liquidée. LTV: 78%',
          type: 'warning',
          read: false,
          timestamp: new Date(Date.now() - 600000), // 10 minutes ago
          actionUrl: '/credit',
          actionLabel: 'Ajouter garantie'
        },
        {
          id: '3',
          title: 'Récompenses disponibles',
          message: 'Vous avez 45.2 tokens de récompense à réclamer.',
          type: 'info',
          read: true,
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          actionUrl: '/staking',
          actionLabel: 'Réclamer'
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }
  }, [user]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="h-4 w-4 text-yellow-400" />;
      case 'error':
        return <X {...iconProps} className="h-4 w-4 text-red-400" />;
      default:
        return <Info {...iconProps} className="h-4 w-4 text-blue-400" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins}min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  if (!user) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center text-gray-400">
            Connectez-vous pour voir vos notifications
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-blue-400 hover:text-blue-300"
            >
              Tout marquer lu
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            Aucune notification
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all ${
                notification.read 
                  ? 'bg-slate-800/30 border-slate-700' 
                  : 'bg-slate-700/50 border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium text-sm ${
                        notification.read ? 'text-gray-300' : 'text-white'
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      notification.read ? 'text-gray-400' : 'text-gray-300'
                    } line-clamp-2`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      {notification.actionUrl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-400 hover:text-blue-300 h-auto p-0 text-xs"
                          onClick={() => {
                            markAsRead(notification.id);
                            // Navigate to actionUrl
                            toast.info(`Navigation vers ${notification.actionLabel}`);
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
