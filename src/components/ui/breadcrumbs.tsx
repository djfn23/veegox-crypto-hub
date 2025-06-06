
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const routeLabels: Record<string, string> = {
  '/': 'Accueil',
  '/wallet': 'Portefeuille',
  '/credit': 'Score de Crédit',
  '/staking': 'Staking',
  '/dao': 'DAO',
  '/crowdfunding': 'Crowdfunding',
  '/market-analysis': 'Analyse de Marché',
  '/exchange': 'Exchange',
  '/ai-recommendations': 'IA Recommandations',
  '/social': 'Social',
  '/notifications': 'Notifications',
  '/help': 'Aide',
  '/profile': 'Profil',
  '/security': 'Sécurité',
  '/legal': 'Mentions Légales',
  '/about': 'À Propos',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Accueil', path: '/', icon: <Home className="h-3 w-3" /> },
  ];

  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const label = routeLabels[currentPath] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
    breadcrumbs.push({ label, path: currentPath });
  });

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-gray-400 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && <ChevronRight className="h-3 w-3 text-gray-500" />}
          <Link
            to={breadcrumb.path}
            className={cn(
              'flex items-center space-x-1 hover:text-white transition-colors',
              index === breadcrumbs.length - 1
                ? 'text-white font-medium'
                : 'text-gray-400'
            )}
          >
            {breadcrumb.icon && <span>{breadcrumb.icon}</span>}
            <span>{breadcrumb.label}</span>
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
