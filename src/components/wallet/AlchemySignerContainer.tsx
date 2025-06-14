
import React, { useEffect } from 'react';

export const AlchemySignerContainer = () => {
  useEffect(() => {
    // S'assurer que le container iframe existe pour Alchemy Signer
    const containerId = 'alchemy-signer-iframe-container';
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
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
      const container = document.getElementById(containerId);
      if (container) {
        container.remove();
      }
    };
  }, []);

  return null;
};
