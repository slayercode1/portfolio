'use client'

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useSyncExternalStore } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const subscribeNoop = () => () => {}

const Toaster = ({ ...props }: ToasterProps) => {
  // Vrai uniquement côté client, sans rendu supplémentaire après l'hydratation.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const { theme = "system" } = useTheme()

  if (!mounted) {
    return null
  }

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
  )
}

export { Toaster }
