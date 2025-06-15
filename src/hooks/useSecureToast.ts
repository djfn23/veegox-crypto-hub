
import { useCallback } from 'react';

// Safe toast function that doesn't break if sonner is not available
let toastFunction: any = null;
let isLoading = false;

const loadToast = async () => {
  if (toastFunction || isLoading) return toastFunction;
  
  isLoading = true;
  try {
    const sonnerModule = await import('sonner');
    toastFunction = sonnerModule.toast;
  } catch (error) {
    console.warn('Toast function not available:', error);
    // Create mock function that doesn't break the app
    const mockToast = () => {};
    mockToast.success = () => {};
    mockToast.error = () => {};
    mockToast.info = () => {};
    mockToast.warning = () => {};
    mockToast.loading = () => {};
    mockToast.dismiss = () => {};
    toastFunction = mockToast;
  }
  isLoading = false;
  return toastFunction;
};

export const useSecureToast = () => {
  const showToast = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast(...args);
  }, []);

  const success = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.success(...args);
  }, []);

  const error = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.error(...args);
  }, []);

  const info = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.info(...args);
  }, []);

  const warning = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.warning(...args);
  }, []);

  const loading = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.loading(...args);
  }, []);

  const dismiss = useCallback(async (...args: any[]) => {
    const toast = await loadToast();
    return toast.dismiss(...args);
  }, []);

  return {
    toast: showToast,
    success,
    error,
    info,
    warning,
    loading,
    dismiss
  };
};

// Export a direct toast object for backwards compatibility
export const secureToast = {
  success: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.success(...args);
  },
  error: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.error(...args);
  },
  info: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.info(...args);
  },
  warning: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.warning(...args);
  },
  loading: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.loading(...args);
  },
  dismiss: async (...args: any[]) => {
    const toast = await loadToast();
    return toast.dismiss(...args);
  }
};
