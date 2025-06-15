
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

// Version SSR-safe (0 hooks !)
export const useSecureToast = () => {
  return {
    toast: async (...args: any[]) => {
      const toast = await loadToast();
      return toast(...args);
    },
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
    },
  };
};

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
  },
};
