
import * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Comprehensive safety check for React availability
  if (!React || typeof React.createElement === 'undefined') {
    console.error('React is not available in Sonner component');
    return null;
  }

  // Additional check for Sonner component availability
  if (!Sonner) {
    console.error('Sonner component is not available');
    return null;
  }

  try {
    return (
      <Sonner
        theme="dark"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton:
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
        {...props}
      />
    );
  } catch (error) {
    console.error('Error rendering Sonner component:', error);
    return null;
  }
};

export { Toaster };
export { toast } from "sonner";
