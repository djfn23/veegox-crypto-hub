
import React, { useEffect } from 'react';

export const AlchemySignerContainer = () => {
  useEffect(() => {
    // Guard de sécurité pour s'assurer que document existe
    if (typeof document === 'undefined') {
      return;
    }

    // S'assurer que le container iframe existe pour Alchemy Signer
    const containerId = 'alchemy-signer-iframe-container';
    let container = document.getElementById(containerId);
    
    if (!container) {
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
    }

    return () => {
      // Cleanup avec guard de sécurité
      if (typeof document !== 'undefined') {
        const existingContainer = document.getElementById(containerId);
        if (existingContainer && existingContainer.parentNode) {
          existingContainer.parentNode.removeChild(existingContainer);
        }
      }
    };
  }, []);

  return null;
};
