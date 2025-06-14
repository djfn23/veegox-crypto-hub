
import * as React from "react";

type ToasterProps = {
  theme?: "light" | "dark" | "system";
  className?: string;
  toastOptions?: any;
} & Record<string, any>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Comprehensive safety check for React availability
  if (!React || typeof React.createElement === 'undefined') {
    console.error('React is not available in Sonner component');
    return null;
  }

  // Check if React hooks are available
  if (typeof React.useState === 'undefined') {
    console.error('React hooks are not available in Sonner component');
    return null;
  }

  // Use dynamic import to avoid loading Sonner until React is ready
  const [SonnerComponent, setSonnerComponent] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Only import and use Sonner after React is confirmed to be available
    const loadSonner = async () => {
      try {
        // Verify React is still available
        if (!React || typeof React.useState === 'undefined') {
          console.error('React became unavailable during Sonner loading');
          setIsLoading(false);
          return;
        }

        const { Toaster: SonnerToaster } = await import('sonner');
        setSonnerComponent(() => SonnerToaster);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Sonner component:', error);
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure React is fully initialized
    const timer = setTimeout(loadSonner, 150);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!SonnerComponent) {
    console.error('Sonner component failed to load');
    return null;
  }

  try {
    return React.createElement(SonnerComponent, {
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
    console.error('Error rendering Sonner component:', error);
    return null;
  }
};

// Dynamic export of toast function
let toastFunction: any = null;

const getToast = async () => {
  if (!toastFunction) {
    try {
      const { toast } = await import('sonner');
      toastFunction = toast;
    } catch (error) {
      console.error('Error loading toast function:', error);
      toastFunction = () => console.warn('Toast function not available');
    }
  }
  return toastFunction;
};

// Create a safe toast wrapper
const toast = (...args: any[]) => {
  getToast().then(toastFn => {
    if (toastFn && typeof toastFn === 'function') {
      toastFn(...args);
    }
  });
};

// Add common toast methods
toast.success = (...args: any[]) => {
  getToast().then(toastFn => {
    if (toastFn && typeof toastFn.success === 'function') {
      toastFn.success(...args);
    }
  });
};

toast.error = (...args: any[]) => {
  getToast().then(toastFn => {
    if (toastFn && typeof toastFn.error === 'function') {
      toastFn.error(...args);
    }
  });
};

toast.info = (...args: any[]) => {
  getToast().then(toastFn => {
    if (toastFn && typeof toastFn.info === 'function') {
      toastFn.info(...args);
    }
  });
};

toast.warning = (...args: any[]) => {
  getToast().then(toastFn => {
    if (toastFn && typeof toastFn.warning === 'function') {
      toastFn.warning(...args);
    }
  });
};

export { Toaster, toast };
