
// Système de localisation centralisé pour l'application Veegox
export const texts = {
  // Général
  app: {
    name: "Veegox",
    tagline: "Crypto Hub",
    description: "Révolutionnant la DeFi avec l'IA",
    beta: "Beta"
  },

  // Navigation
  navigation: {
    primary: {
      home: { full: "Accueil", short: "🏠 Accueil" },
      wallet: { full: "Portefeuille", short: "💰 Portefeuille" },
      tokens: { full: "Tokens", short: "🪙 Tokens" },
      exchange: { full: "Exchange", short: "🔄 Exchange" },
      trading: { full: "Trading", short: "📈 Trading" }
    },
    financial: {
      credit: { full: "Crédit", short: "💳 Crédit" },
      staking: { full: "Staking", short: "🔒 Staking" },
      crowdfunding: { full: "Crowdfunding", short: "👥 Crowdfunding" },
      createCampaign: { full: "Créer Campagne", short: "➕ Créer Campagne" }
    },
    advanced: {
      dao: { full: "DAO", short: "🏛️ DAO" },
      governance: { full: "Gouvernance", short: "🗳️ Gouvernance" },
      marketAnalysis: { full: "Analyse Marché", short: "🔍 Analyse" },
      analytics: { full: "Analytics", short: "📊 Analytics" },
      aiRecommendations: { full: "IA Recommandations", short: "🧠 IA" },
      social: { full: "Social", short: "💬 Social" }
    },
    sections: {
      principal: "Principal",
      finance: "Finance",
      advanced: "Avancé"
    }
  },

  // Page d'accueil
  home: {
    hero: {
      title: "La Plateforme DeFi",
      subtitle: "Tout-en-Un avec IA",
      description: "Veegox révolutionne la DeFi avec une plateforme complète intégrant l'IA pour des recommandations d'investissement intelligentes.",
      cta: {
        primary: "Lancer l'Application",
        secondary: "Commencer Maintenant"
      }
    },
    features: {
      title: "4 Modules, 1 Plateforme",
      items: {
        tokens: {
          title: "Token Manager",
          description: "Créez et gérez vos tokens personnalisés avec déploiement automatique"
        },
        credit: {
          title: "Module Crédit IA",
          description: "Système de prêts décentralisés avec scoring de crédit basé sur l'IA"
        },
        staking: {
          title: "Module Staking",
          description: "Pools de staking avec rendements optimisés et récompenses automatiques"
        },
        dao: {
          title: "Module DAO",
          description: "Gouvernance décentralisée avec propositions et système de vote"
        }
      }
    },
    stats: {
      web3Market: { label: "Marché Web3 2025", value: "$6.15B", growth: "CAGR 38.9%" },
      defiMarket: { label: "Marché DeFi 2025", value: "$32.36B", growth: "CAGR 53.8%" },
      tvl: { label: "TVL Veegox", value: "$2.4M", growth: "+147%" },
      users: { label: "Utilisateurs Actifs", value: "15K+", growth: "Segment cible" }
    },
    cta: {
      title: "Rejoignez la Révolution DeFi",
      description: "Devenez pionnier de la première plateforme DeFi tout-en-un avec IA intégrée",
      button: "Commencer Maintenant"
    },
    footer: "© 2024 Veegox. Révolutionnant la DeFi avec l'IA"
  },

  // Authentification
  auth: {
    modal: {
      title: "Authentification",
      tabs: {
        signin: { full: "Connexion", short: "📧 Connexion" },
        signup: { full: "Inscription", short: "🆕 Inscription" }
      },
      fields: {
        email: { label: "Email", placeholder: "votre@email.com" },
        password: { label: "Mot de passe", placeholder: "••••••••" },
        fullName: { label: "Nom complet", placeholder: "Jean Dupont" }
      },
      buttons: {
        signin: { default: "Se connecter", loading: "Connexion..." },
        signup: { default: "S'inscrire", loading: "Inscription..." }
      },
      messages: {
        signupSuccess: "Compte créé avec succès ! Vérifiez votre email.",
        signinSuccess: "Connexion réussie !",
        connectionButtons: { login: "Connexion", start: "Commencer" }
      }
    }
  },

  // Modules de staking
  staking: {
    header: {
      title: "Module Staking",
      description: "Stakez vos tokens et gagnez des récompenses passives",
      subtitle: "💎 Incluant notre token ERC20Template avec des APY préférentiels"
    },
    stats: {
      totalStaked: "Total Staké",
      rewards: "Récompenses",
      averageApy: "APY Moyen",
      activePools: "Pools Actifs"
    },
    tabs: {
      erc20: { full: "Notre Token", short: "🪙 Notre Token" },
      pools: { full: "Pools Génériques", short: "🔒 Pools Génériques" },
      stakes: { full: "Mes Stakes", short: "🏆 Mes Stakes" }
    },
    actions: {
      stake: "Staker",
      restake: "Restaker",
      unstake: "Unstaker"
    },
    info: {
      tvl: "TVL",
      minStake: "Min Stake",
      lockPeriod: "Lock Period",
      flexible: "Flexible"
    }
  },

  // Module de crédit
  credit: {
    tabs: {
      overview: { full: "Vue d'ensemble", short: "🏠 Vue d'ensemble" },
      collateral: { full: "Token Collateral", short: "💰 Token Collateral" },
      loans: { full: "Mes Prêts", short: "📋 Mes Prêts" }
    }
  },

  // Profil utilisateur
  profile: {
    member: "Premium Member",
    actions: {
      settings: "Paramètres",
      help: "Aide",
      security: "Sécurité",
      logout: "Déconnexion"
    }
  },

  // Messages d'état
  states: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    empty: "Aucune donnée disponible",
    noResults: "Aucun résultat trouvé"
  },

  // Termes financiers
  financial: {
    apy: "APY",
    tvl: "TVL",
    stake: "Stake",
    unstake: "Unstake",
    rewards: "Récompenses",
    balance: "Solde",
    transaction: "Transaction",
    pool: "Pool",
    liquidity: "Liquidité"
  }
};

// Fonction utilitaire pour obtenir un texte selon le contexte mobile
export const getResponsiveText = (textObj: { full: string; short: string }, isMobile: boolean) => {
  return isMobile ? textObj.short : textObj.full;
};

// Types pour l'autocomplétion TypeScript
export type TextKeys = typeof texts;
