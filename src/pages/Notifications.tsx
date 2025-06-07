
import { PageLayout } from "@/components/layout/PageLayout";
import { NotificationCenter } from "@/components/modules/notifications/NotificationCenter";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <PageLayout
      title="Notifications"
      subtitle="Restez informé des dernières activités de votre compte"
      icon={<Bell className="h-6 w-6 text-yellow-400" />}
    >
      <NotificationCenter />
    </PageLayout>
  );
};

export default Notifications;
