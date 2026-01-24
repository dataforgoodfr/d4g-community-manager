import { Link } from '@tanstack/react-router'
import React from 'react'

type NavButtonProps = {
  to: string
  onClick?: () => void
  className?: string
  activeClassName?: string
  icon?: React.ReactNode
}

export default function NavButton({
  to,
  onClick,
  className = 'flex items-center gap-3 p-3 rounded-lg hover:bg-primary-foreground transition-colors',
  activeClassName = 'flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-white text-(--primary) transition-colors',
  icon,
  children,
}: React.PropsWithChildren<NavButtonProps>) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={className}
      activeProps={{ className: activeClassName }}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  )
}
