
import { PageLayout } from "@/components/layout/PageLayout";
import { CryptoBankModule } from "@/components/modules/banking/CryptoBankModule";
import { Wallet } from "lucide-react";

const CryptoBankPage = () => {
  return (
    <PageLayout
      title="Banque Crypto"
      subtitle="Gérez vos comptes et services bancaires crypto"
      icon={<Wallet className="h-6 w-6" />}
    >
      <CryptoBankModule />
    </PageLayout>
  );
};

export default CryptoBankPage;
