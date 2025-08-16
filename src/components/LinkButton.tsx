"use client"

import { Link } from "react-aria-components"

interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline"
  target?: "_blank" | "_self"
}

export function LinkButton({ href, children, variant = "default", target = "_blank" }: LinkButtonProps) {
  const className = `link-button ${variant !== "default" ? `variant-${variant}` : ""}`

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </Link>
  )
}
