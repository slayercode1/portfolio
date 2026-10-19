import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

// Même géométrie que les icônes générées dans public/ (viewBox 64, curseur vert).
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('h-7 w-7 shrink-0', className)} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-foreground" />
      <text
        x="11"
        y="41"
        fontSize="25"
        fontWeight="700"
        letterSpacing="-1"
        className="fill-background"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        yc
      </text>
      <rect x="44" y="37" width="10" height="4.5" rx="1" className="fill-highlight" />
    </svg>
  )
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="font-mono text-sm font-semibold tracking-[-0.02em] text-foreground">yann.clain</span>
      ) : null}
    </span>
  )
}
