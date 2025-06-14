
import { useState, useEffect } from 'react';

interface BiometricAuthResult {
  success: boolean;
  error?: string;
}

export const useBiometricAuth = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    if ('credentials' in navigator && 'create' in navigator.credentials) {
      try {
        // Check if WebAuthn is supported
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsSupported(available);
        
        // Check if user has biometric credentials enrolled
        if (available && localStorage.getItem('biometric_enrolled') === 'true') {
          setIsEnrolled(true);
        }
      } catch (error) {
        console.log('Biometric authentication not supported:', error);
        setIsSupported(false);
      }
    }
  };

  const enrollBiometric = async (userId: string): Promise<BiometricAuthResult> => {
    if (!isSupported) {
      return { success: false, error: 'Authentification biométrique non supportée' };
    }

    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: "Veegox Crypto Hub",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(userId),
            name: userId,
            displayName: "Utilisateur Veegox"
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" }
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential && credential.id) {
        // Store credential ID locally (in production, store on server)
        localStorage.setItem('biometric_credential_id', credential.id);
        localStorage.setItem('biometric_enrolled', 'true');
        setIsEnrolled(true);
        return { success: true };
      }

      return { success: false, error: 'Échec de l\'inscription biométrique' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur biométrique' };
    }
  };

  const authenticateWithBiometric = async (): Promise<BiometricAuthResult> => {
    if (!isSupported || !isEnrolled) {
      return { success: false, error: 'Authentification biométrique non disponible' };
    }

    try {
      const credentialId = localStorage.getItem('biometric_credential_id');
      if (!credentialId) {
        return { success: false, error: 'Aucune empreinte biométrique enregistrée' };
      }

      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [{
            id: new TextEncoder().encode(credentialId),
            type: 'public-key'
          }],
          userVerification: 'required',
          timeout: 60000
        }
      });

      if (assertion) {
        return { success: true };
      }

      return { success: false, error: 'Authentification biométrique échouée' };
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        return { success: false, error: 'Authentification annulée par l\'utilisateur' };
      }
      return { success: false, error: error.message || 'Erreur d\'authentification' };
    }
  };

  const removeBiometric = () => {
    localStorage.removeItem('biometric_credential_id');
    localStorage.removeItem('biometric_enrolled');
    setIsEnrolled(false);
  };

  return {
    isSupported,
    isEnrolled,
    enrollBiometric,
    authenticateWithBiometric,
    removeBiometric,
    checkBiometricSupport
  };
};
