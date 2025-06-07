
import { PageLayout } from "@/components/layout/PageLayout";
import { ProfileSettings } from "@/components/modules/ProfileSettings";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <PageLayout
      title="Paramètres"
      subtitle="Configurez votre compte et vos préférences"
      icon={<SettingsIcon className="h-6 w-6 text-gray-400" />}
    >
      <ProfileSettings />
    </PageLayout>
  );
};

export default Settings;
