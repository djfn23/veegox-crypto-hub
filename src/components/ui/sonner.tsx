
import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";

console.log('Sonner: Module loading with React:', !!React);
console.log('Sonner: React.useSyncExternalStore available:', !!React?.useSyncExternalStore);

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  console.log('Sonner: Toaster component initializing');
  
  // Ensure React is available before proceeding
  if (!React) {
    console.error('Sonner: React is not available');
    return null;
  }

  if (!React.useSyncExternalStore) {
    console.error('Sonner: React.useSyncExternalStore is not available');
    return null;
  }

  console.log('Sonner: React and useSyncExternalStore verified, proceeding with Toaster');

  // Utilisation d'un thème par défaut sécurisé
  const theme = 'dark';

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
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
};

export { Toaster, toast };
