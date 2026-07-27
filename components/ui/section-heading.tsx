interface SectionHeadingProps {
  description: string
  index: string
  title: string
}

export function SectionHeading({ description, index, title }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex rounded-full bg-highlight/12 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
        {index}
      </p>
      <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[17px]">
        {description}
      </p>
    </div>
  )
}
