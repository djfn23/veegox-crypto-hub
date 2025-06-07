
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, Shield, Clock } from "lucide-react";

const Legal = () => {
  return (
    <PageLayout
      title="Mentions Légales"
      subtitle="Conditions d'utilisation et politique de confidentialité"
      icon={<Scale className="h-6 w-6 text-blue-400" />}
    >
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="terms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Conditions d'Utilisation</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="risks">Avertissements</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Conditions d'Utilisation
                  </CardTitle>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                    Version 2.1
                  </Badge>
                </div>
                <p className="text-gray-400">Dernière mise à jour : 15 décembre 2024</p>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">1. Acceptation des Conditions</h3>
                  <p className="leading-relaxed">
                    En accédant et en utilisant la plateforme Veegox, vous acceptez d'être lié par ces conditions d'utilisation. 
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                  </p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">2. Description du Service</h3>
                  <p className="leading-relaxed mb-3">
                    Veegox est une plateforme DeFi (Finance Décentralisée) qui permet aux utilisateurs de :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Échanger des crypto-monnaies</li>
                    <li>Participer à des pools de liquidité</li>
                    <li>Staker des tokens pour gagner des récompenses</li>
                    <li>Participer à la gouvernance DAO</li>
                    <li>Créer et échanger des NFTs</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">3. Éligibilité</h3>
                  <p className="leading-relaxed">
                    Vous devez avoir au moins 18 ans pour utiliser nos services. L'utilisation de Veegox peut être 
                    restreinte ou interdite dans certaines juridictions. Il vous incombe de vous assurer que votre 
                    utilisation est conforme aux lois locales.
                  </p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">4. Responsabilités de l'Utilisateur</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintenir la sécurité de vos clés privées et mots de passe</li>
                    <li>Fournir des informations exactes et à jour</li>
                    <li>Ne pas utiliser la plateforme à des fins illégales</li>
                    <li>Respecter les droits de propriété intellectuelle</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">5. Frais et Commissions</h3>
                  <p className="leading-relaxed">
                    L'utilisation de certains services peut entraîner des frais. Tous les frais sont clairement 
                    affichés avant la confirmation des transactions. Les frais de gas blockchain sont à la charge 
                    de l'utilisateur.
                  </p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">6. Limitation de Responsabilité</h3>
                  <p className="leading-relaxed">
                    Veegox n'est pas responsable des pertes financières résultant de l'utilisation de la plateforme, 
                    des fluctuations de prix des crypto-monnaies, ou des défaillances techniques des blockchains 
                    sous-jacentes.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Politique de Confidentialité
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                    RGPD Conforme
                  </Badge>
                </div>
                <p className="text-gray-400">Dernière mise à jour : 15 décembre 2024</p>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Collecte des Données</h3>
                  <p className="leading-relaxed mb-3">
                    Nous collectons les informations suivantes :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Adresses de wallet publiques</li>
                    <li>Historique des transactions</li>
                    <li>Données d'utilisation de la plateforme</li>
                    <li>Informations techniques (IP, user agent)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Utilisation des Données</h3>
                  <p className="leading-relaxed">
                    Vos données sont utilisées exclusivement pour améliorer nos services, assurer la sécurité 
                    de la plateforme et respecter nos obligations légales. Nous ne vendons jamais vos données 
                    personnelles à des tiers.
                  </p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Protection des Données</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Chiffrement end-to-end pour les données sensibles</li>
                    <li>Stockage sécurisé avec authentification multi-facteurs</li>
                    <li>Audits de sécurité réguliers</li>
                    <li>Accès restreint aux données personnelles</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Vos Droits</h3>
                  <p className="leading-relaxed mb-3">
                    Conformément au RGPD, vous avez le droit de :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Accéder à vos données personnelles</li>
                    <li>Rectifier vos informations</li>
                    <li>Supprimer votre compte</li>
                    <li>Exporter vos données</li>
                    <li>Vous opposer au traitement</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Cookies et Tracking</h3>
                  <p className="leading-relaxed">
                    Nous utilisons des cookies essentiels pour le fonctionnement de la plateforme et des cookies 
                    analytiques pour améliorer l'expérience utilisateur. Vous pouvez gérer vos préférences dans 
                    les paramètres de votre navigateur.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  Avertissements sur les Risques
                </CardTitle>
                <p className="text-red-300">
                  Important : Lisez attentivement avant d'utiliser les services DeFi
                </p>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2">⚠️ Risques Généraux</h4>
                  <p className="text-sm">
                    Les investissements en crypto-monnaies sont hautement spéculatifs et comportent des risques 
                    importants de perte. Ne jamais investir plus que ce que vous pouvez vous permettre de perdre.
                  </p>
                </div>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Risques de Marché</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Volatilité extrême des prix des crypto-monnaies</li>
                    <li>Risque de perte totale du capital investi</li>
                    <li>Fluctuations des APY et rendements</li>
                    <li>Risque de liquidation en cas de collatéral insuffisant</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Risques Techniques</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Bugs ou vulnérabilités dans les smart contracts</li>
                    <li>Risques de hacking ou d'exploit</li>
                    <li>Congestion du réseau blockchain</li>
                    <li>Frais de gas imprévisibles</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Risques Réglementaires</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Changements dans la réglementation des crypto-monnaies</li>
                    <li>Restrictions d'accès selon la juridiction</li>
                    <li>Implications fiscales variables</li>
                    <li>Conformité KYC/AML requise</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-semibold mb-3">Risques de Liquidité</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Difficultés à vendre ou échanger certains tokens</li>
                    <li>Slippage important sur les gros ordres</li>
                    <li>Périodes de lock-up pour le staking</li>
                    <li>Risque d'impermanent loss dans les pools</li>
                  </ul>
                </section>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-2">💡 Recommandations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Diversifiez vos investissements</li>
                    <li>• Commencez par de petits montants</li>
                    <li>• Comprenez les mécanismes avant d'investir</li>
                    <li>• Gardez vos clés privées en sécurité</li>
                    <li>• Consultez un conseiller financier si nécessaire</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Legal;
