
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

  // Only proceed if we can safely use React hooks
  try {
    // Use a simple approach - import Sonner synchronously but with error handling
    const SonnerToaster = React.useMemo(() => {
      try {
        // Try to import Sonner, but catch any errors
        const { Toaster: ImportedToaster } = require('sonner');
        return ImportedToaster;
      } catch (error) {
        console.warn('Failed to load Sonner:', error);
        return null;
      }
    }, []);

    if (!SonnerToaster) {
      return null;
    }

    return React.createElement(SonnerToaster, {
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

// Safe toast function that doesn't break if Sonner isn't available
const createSafeToast = () => {
  try {
    const { toast: sonnerToast } = require('sonner');
    return sonnerToast;
  } catch (error) {
    console.warn('Toast function not available:', error);
    // Return a mock toast function that does nothing
    const mockToast = () => {};
    mockToast.success = () => {};
    mockToast.error = () => {};
    mockToast.info = () => {};
    mockToast.warning = () => {};
    return mockToast;
  }
};

const toast = createSafeToast();

export { Toaster, toast };
