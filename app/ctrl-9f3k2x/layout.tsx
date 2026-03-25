import Link from "next/link"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden relative">
      {/* Logo to go back home */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
      >
        <span className="text-primary">Y</span>
        <span>C</span>
      </Link>
      {children}
    </div>
  )
}
