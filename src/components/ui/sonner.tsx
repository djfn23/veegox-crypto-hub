
import * as React from "react";

type ToasterProps = {
  theme?: "light" | "dark" | "system";
  className?: string;
  toastOptions?: any;
} & Record<string, any>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Multiple layers of React safety checks
  if (typeof React === 'undefined' || React === null) {
    console.warn('React not available, skipping Sonner component');
    return null;
  }

  if (typeof React.useState !== 'function' || typeof React.useEffect !== 'function') {
    console.warn('React hooks not available, skipping Sonner component');
    return null;
  }

  // Use state to track if we're ready to render Sonner
  const [isReady, setIsReady] = React.useState(false);
  const [sonnerToaster, setSonnerToaster] = React.useState<any>(null);

  React.useEffect(() => {
    // Double check React is still available after mount
    if (typeof React === 'undefined' || React === null || typeof React.useState !== 'function') {
      console.warn('React became unavailable during Sonner effect');
      return;
    }

    const loadSonner = async () => {
      try {
        // Add a small delay to ensure React is fully initialized
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Triple check React is still available
        if (typeof React === 'undefined' || React === null || typeof React.useState !== 'function') {
          console.warn('React not available during Sonner loading');
          return;
        }

        const sonnerModule = await import('sonner');
        setSonnerToaster(() => sonnerModule.Toaster);
        setIsReady(true);
      } catch (error) {
        console.warn('Failed to load Sonner:', error);
        setIsReady(true); // Still set ready to prevent loading state
      }
    };

    loadSonner();
  }, []);

  // Don't render anything until we're ready
  if (!isReady) {
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
    console.warn('Error rendering Sonner component:', error);
    return null;
  }
};

export { Toaster };
