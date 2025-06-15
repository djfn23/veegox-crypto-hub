
import React, { useEffect } from 'react';

export const AlchemySignerContainer = () => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

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
