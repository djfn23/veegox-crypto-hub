
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, FileText, AlertTriangle } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Scale className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Mentions Légales</h1>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="terms" className="text-white">CGU</TabsTrigger>
            <TabsTrigger value="privacy" className="text-white">Confidentialité</TabsTrigger>
            <TabsTrigger value="disclaimers" className="text-white">Avertissements</TabsTrigger>
            <TabsTrigger value="company" className="text-white">Société</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Conditions Générales d'Utilisation</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400">Version 2.1</Badge>
                </div>
                <CardDescription className="text-gray-300">
                  Dernière mise à jour : 15 janvier 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-white font-semibold mb-3">1. Acceptation des Conditions</h3>
                  <p className="mb-4">
                    En accédant et en utilisant la plateforme Veegox, vous acceptez d'être lié par les présentes 
                    conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez 
                    pas utiliser nos services.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">2. Description du Service</h3>
                  <p className="mb-4">
                    Veegox est une plateforme DeFi (Finance Décentralisée) qui permet aux utilisateurs de :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Créer et gérer des tokens (ERC-20, NFT)</li>
                    <li>Accéder à des services de prêt avec scoring IA</li>
                    <li>Participer au staking de cryptomonnaies</li>
                    <li>Participer à la gouvernance DAO</li>
                    <li>Échanger des tokens de manière décentralisée</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">3. Éligibilité</h3>
                  <p className="mb-4">
                    Vous devez avoir au moins 18 ans et être légalement autorisé à utiliser nos services 
                    dans votre juridiction. L'utilisation de Veegox peut être restreinte ou interdite 
                    dans certains pays.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">4. Risques et Responsabilités</h3>
                  <p className="mb-4">
                    L'utilisation de services DeFi implique des risques significatifs, notamment :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Volatilité des prix des cryptomonnaies</li>
                    <li>Risques techniques liés aux smart contracts</li>
                    <li>Risques de liquidité</li>
                    <li>Changements réglementaires</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">5. Propriété Intellectuelle</h3>
                  <p className="mb-4">
                    Tous les contenus, logos, marques et technologies de Veegox sont protégés par 
                    des droits de propriété intellectuelle. Toute reproduction non autorisée est interdite.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">6. Limitation de Responsabilité</h3>
                  <p className="mb-4">
                    Veegox ne saurait être tenu responsable des pertes financières résultant de 
                    l'utilisation de la plateforme, incluant mais non limité aux bugs de smart contracts, 
                    erreurs d'utilisateur, ou conditions de marché défavorables.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Politique de Confidentialité
                  </CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-400">RGPD Compliant</Badge>
                </div>
                <CardDescription className="text-gray-300">
                  Dernière mise à jour : 15 janvier 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-white font-semibold mb-3">1. Collecte de Données</h3>
                  <p className="mb-4">
                    Veegox collecte uniquement les données nécessaires au fonctionnement de la plateforme :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresses de portefeuilles connectés</li>
                    <li>Historique des transactions on-chain (publiques)</li>
                    <li>Données de navigation anonymisées</li>
                    <li>Préférences utilisateur</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">2. Utilisation des Données</h3>
                  <p className="mb-4">
                    Vos données sont utilisées pour :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Calculer votre score de crédit IA</li>
                    <li>Personnaliser votre expérience</li>
                    <li>Fournir des recommandations d'investissement</li>
                    <li>Assurer la sécurité de la plateforme</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">3. Stockage et Sécurité</h3>
                  <p className="mb-4">
                    Toutes les données sont stockées de manière sécurisée avec chiffrement AES-256. 
                    Nous n'avons jamais accès à vos clés privées - elles restent dans votre portefeuille.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">4. Partage de Données</h3>
                  <p className="mb-4">
                    Veegox ne vend, ne loue, ni ne partage vos données personnelles avec des tiers, 
                    sauf dans les cas suivants :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Obligation légale ou réglementaire</li>
                    <li>Protection contre la fraude</li>
                    <li>Consentement explicite de l'utilisateur</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">5. Vos Droits</h3>
                  <p className="mb-4">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Accès à vos données personnelles</li>
                    <li>Rectification des données incorrectes</li>
                    <li>Suppression de vos données</li>
                    <li>Portabilité des données</li>
                    <li>Opposition au traitement</li>
                  </ul>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disclaimers" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                  Avertissements et Risques
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Informations importantes sur les risques liés à la DeFi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-3">⚠️ Risques Majeurs</h3>
                  <ul className="space-y-2">
                    <li>• <strong>Perte totale possible :</strong> Les investissements DeFi peuvent entraîner une perte totale du capital</li>
                    <li>• <strong>Volatilité extrême :</strong> Les prix peuvent varier de plus de 50% en une journée</li>
                    <li>• <strong>Risques techniques :</strong> Bugs dans les smart contracts, hacks, erreurs de code</li>
                    <li>• <strong>Risque réglementaire :</strong> Changements dans la législation crypto</li>
                  </ul>
                </div>

                <section>
                  <h3 className="text-white font-semibold mb-3">Scoring Crédit IA</h3>
                  <p className="mb-4">
                    Le scoring crédit basé sur l'IA est expérimental et ne garantit pas la solvabilité. 
                    Il ne doit pas être considéré comme un conseil financier professionnel.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Recommandations d'Investissement</h3>
                  <p className="mb-4">
                    Les recommandations générées par notre IA sont basées sur des algorithmes et des 
                    données historiques. Elles ne constituent pas des conseils en investissement personnalisés.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Smart Contracts</h3>
                  <p className="mb-4">
                    Bien que nos smart contracts soient audités, ils peuvent contenir des bugs ou 
                    vulnérabilités non détectées. Utilisez uniquement des fonds que vous pouvez vous permettre de perdre.
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Impermanent Loss</h3>
                  <p className="mb-4">
                    La fourniture de liquidité peut entraîner une "perte impermanente" si les prix 
                    des tokens évoluent différemment par rapport à la simple détention.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Informations Société
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Détails légaux de la société Veegox
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-white font-semibold mb-3">Identification de la Société</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Dénomination sociale :</strong> Veegox SAS</p>
                      <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
                      <p><strong>Capital social :</strong> 100,000 EUR</p>
                      <p><strong>SIRET :</strong> 12345678901234</p>
                    </div>
                    <div>
                      <p><strong>RCS :</strong> Paris B 123 456 789</p>
                      <p><strong>TVA Intracommunautaire :</strong> FR12345678901</p>
                      <p><strong>Code APE :</strong> 6201Z</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Siège Social</h3>
                  <p>
                    123 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Direction</h3>
                  <p><strong>Président :</strong> [Nom du Dirigeant]</p>
                  <p><strong>Directeur de la Publication :</strong> [Nom du Directeur]</p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Hébergement</h3>
                  <p>
                    <strong>Hébergeur :</strong> Vercel Inc.<br />
                    340 S Lemon Ave #4133<br />
                    Walnut, CA 91789, États-Unis
                  </p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Licences et Autorisations</h3>
                  <ul className="space-y-2">
                    <li>• <strong>PSAN :</strong> Prestataire de Services sur Actifs Numériques (en cours)</li>
                    <li>• <strong>Audits :</strong> Smart contracts audités par Consensys Diligence</li>
                    <li>• <strong>Assurance :</strong> Couverture cyber-risques 10M EUR</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-3">Contact Légal</h3>
                  <p>
                    Pour toute question juridique :<br />
                    <strong>Email :</strong> legal@veegox.com<br />
                    <strong>Téléphone :</strong> +33 1 23 45 67 89
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;
