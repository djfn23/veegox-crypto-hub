
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, AlertTriangle, TrendingUp, Vote, Clock, Check, X } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "price", title: "ETH Price Alert", message: "Ethereum a atteint $2,500", time: "Il y a 5 min", read: false, priority: "high" },
    { id: 2, type: "dao", title: "Nouvelle Proposition DAO", message: "Proposition #47: Amélioration du protocole", time: "Il y a 1h", read: false, priority: "medium" },
    { id: 3, type: "defi", title: "Récompense de Staking", message: "Vous avez reçu 0.05 ETH de récompenses", time: "Il y a 3h", read: true, priority: "low" },
    { id: 4, type: "security", title: "Nouvelle Connexion", message: "Connexion depuis un nouvel appareil", time: "Il y a 6h", read: false, priority: "high" },
    { id: 5, type: "system", title: "Maintenance Prévue", message: "Maintenance système le 15/01 à 2h00", time: "Hier", read: true, priority: "medium" }
  ]);

  const settings = {
    priceAlerts: true,
    daoNotifications: true,
    stakingRewards: true,
    securityAlerts: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: false
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-4 w-4" />;
      case 'dao': return <Vote className="h-4 w-4" />;
      case 'defi': return <Clock className="h-4 w-4" />;
      case 'security': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Bell className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </div>
          <Button onClick={markAllAsRead} variant="outline" className="text-white border-white/20">
            Tout marquer comme lu
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="all" className="text-white">
              Toutes ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-white">
              Non lues ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Toutes les Notifications</CardTitle>
                <CardDescription className="text-gray-300">
                  Historique complet de vos notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg bg-white/5 border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-white/10' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 text-purple-400">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-semibold">{notification.title}</h3>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => markAsRead(notification.id)}
                              className="text-green-400 hover:bg-green-400/20"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-400 hover:bg-red-400/20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Notifications Non Lues</CardTitle>
                <CardDescription className="text-gray-300">
                  {unreadCount} notification{unreadCount > 1 ? 's' : ''} en attente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg bg-white/10 border-l-4 ${getPriorityColor(notification.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 text-purple-400">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-semibold">{notification.title}</h3>
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Lu
                        </Button>
                      </div>
                    </div>
                  ))}
                  {unreadCount === 0 && (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Aucune notification non lue</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Préférences de Notification</CardTitle>
                  <CardDescription className="text-gray-300">
                    Configurez les types de notifications que vous souhaitez recevoir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Alertes de Prix</div>
                        <div className="text-gray-400 text-sm">Notifications quand les prix atteignent vos seuils</div>
                      </div>
                      <Switch checked={settings.priceAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Notifications DAO</div>
                        <div className="text-gray-400 text-sm">Nouvelles propositions et votes</div>
                      </div>
                      <Switch checked={settings.daoNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Récompenses de Staking</div>
                        <div className="text-gray-400 text-sm">Notifications de récompenses reçues</div>
                      </div>
                      <Switch checked={settings.stakingRewards} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Alertes de Sécurité</div>
                        <div className="text-gray-400 text-sm">Connexions suspectes et activités de sécurité</div>
                      </div>
                      <Switch checked={settings.securityAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Mises à Jour Système</div>
                        <div className="text-gray-400 text-sm">Maintenances et nouvelles fonctionnalités</div>
                      </div>
                      <Switch checked={settings.systemUpdates} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Canaux de Notification</CardTitle>
                  <CardDescription className="text-gray-300">
                    Choisissez comment recevoir vos notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Notifications Email</div>
                        <div className="text-gray-400 text-sm">Recevoir les notifications par email</div>
                      </div>
                      <Switch checked={settings.emailNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Notifications Push</div>
                        <div className="text-gray-400 text-sm">Notifications navigateur et mobile</div>
                      </div>
                      <Switch checked={settings.pushNotifications} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
