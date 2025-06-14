

import * as React from 'react';

console.log('AlchemySignerContainer: Module loading with React:', !!React);

export const AlchemySignerContainer = () => {
  console.log('AlchemySignerContainer: Component initializing');
  
  // Ensure React is available before using hooks
  if (!React) {
    console.error('AlchemySignerContainer: React is not available');
    throw new Error('React is not properly initialized');
  }

  if (!React.useEffect) {
    console.error('AlchemySignerContainer: React.useEffect is not available');
    throw new Error('React.useEffect is not properly initialized');
  }

  React.useEffect(() => {
    console.log('AlchemySignerContainer: useEffect triggered');
    
    // Guard de sécurité pour s'assurer que document existe
    if (typeof document === 'undefined') {
      console.log('AlchemySignerContainer: Document not available (SSR)');
      return;
    }

    console.log('AlchemySignerContainer: Setting up iframe container');

    // S'assurer que le container iframe existe pour Alchemy Signer
    const containerId = 'alchemy-signer-iframe-container';
    let container = document.getElementById(containerId);
    
    if (!container) {
      console.log('AlchemySignerContainer: Creating new container');
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.zIndex = '9999';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    } else {
      console.log('AlchemySignerContainer: Container already exists');
    }

    return () => {
      console.log('AlchemySignerContainer: Cleanup');
      // Cleanup avec guard de sécurité
      if (typeof document !== 'undefined') {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer && existingContainer.parentNode) {
          existingContainer.parentNode.removeChild(existingContainer);
        }
      }
    };
  }, []);

  console.log('AlchemySignerContainer: Rendering null component');
  return null;
};

