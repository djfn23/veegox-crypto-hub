
import * as React from "react";

type ToasterProps = {
  theme?: "light" | "dark" | "system";
  className?: string;
  toastOptions?: any;
} & Record<string, any>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Early safety check - if React is not available, return null immediately
  if (typeof React === 'undefined' || React === null || typeof React.useState === 'undefined') {
    console.warn('React hooks not available, skipping Sonner component');
    return null;
  }

  // Use state to track if Sonner is loaded and ready
  const [sonnerToaster, setSonnerToaster] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Only load Sonner after component mount when React is definitely ready
    const loadSonner = async () => {
      try {
        // Double check React is still available
        if (typeof React === 'undefined' || React === null || typeof React.useState === 'undefined') {
          console.warn('React became unavailable during Sonner loading');
          return;
        }

        // Dynamic import to avoid any synchronous loading issues
        const sonnerModule = await import('sonner');
        setSonnerToaster(() => sonnerModule.Toaster);
        setIsLoaded(true);
      } catch (error) {
        console.warn('Failed to load Sonner:', error);
        setIsLoaded(true); // Still set loaded to prevent infinite loading
      }
    };

    // Add delay to ensure React is fully initialized
    const timer = setTimeout(loadSonner, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until we've attempted to load Sonner
  if (!isLoaded) {
    return null;
  }

  // If Sonner failed to load, return null silently
  if (!sonnerToaster) {
    return null;
  }

  try {
    return React.createElement(sonnerToaster, {
      theme: "dark",
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      },
      ...props,
    });
  } catch (error) {
    console.warn('Error in Sonner component:', error);
    return null;
  }
};

// Safe toast function that loads dynamically
const createSafeToast = () => {
  let toastFunction: any = null;
  
  const loadToast = async () => {
    if (!toastFunction) {
      try {
        const sonnerModule = await import('sonner');
        toastFunction = sonnerModule.toast;
      } catch (error) {
        console.warn('Toast function not available:', error);
        // Create mock function
        const mockToast = () => {};
        mockToast.success = () => {};
        mockToast.error = () => {};
        mockToast.info = () => {};
        mockToast.warning = () => {};
        toastFunction = mockToast;
      }
    }
    return toastFunction;
  };

  const safeToast = (...args: any[]) => {
    loadToast().then(toast => toast(...args));
  };

  safeToast.success = (...args: any[]) => {
    loadToast().then(toast => toast.success(...args));
  };

  safeToast.error = (...args: any[]) => {
    loadToast().then(toast => toast.error(...args));
  };

  safeToast.info = (...args: any[]) => {
    loadToast().then(toast => toast.info(...args));
  };

  safeToast.warning = (...args: any[]) => {
    loadToast().then(toast => toast.warning(...args));
  };

  return safeToast;
};

const toast = createSafeToast();

export { Toaster, toast };
