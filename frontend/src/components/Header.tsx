import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, Presentation, User, Users, X } from 'lucide-react'
import NavButton from './NavButton'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { to: '/users', label: 'Utilisateurs', icon: <Users size={20} /> },
    { to: '/projects', label: 'Projets', icon: <Presentation size={20} /> },
    { to: '/login', label: 'Connexion', icon: <User size={20} />, end: true },
  ]

  const endItems = navLinks.filter((i) => (i as any).end)
  const mainLinks = navLinks.filter((i) => !(i as any).end)

  return (
    <>
      <header className="m-2 md:mx-20 md:my-4 p-4 flex items-center bg-(--primary) rounded-3xl md:rounded-4xl text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 md:hidden hover:bg-(--primary-foreground) rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <img src="/logo.png" alt="TanStack Logo" className="h-10" />
          </Link>
        </h1>

        <nav className="mx-auto hidden md:flex md:items-center md:gap-6">
          {mainLinks.map((item) => (
            <NavButton key={item.to} to={item.to} onClick={() => setIsOpen(false)} icon={item.icon}>
              {item.label}
            </NavButton>
          ))}
        </nav>

        {/* boutons de droite (desktop uniquement) */}
        {endItems.length > 0 ? (
          <div className="hidden md:flex md:items-center ml-4">
            {endItems.map((item) => (
              <NavButton key={item.to} to={item.to} onClick={() => setIsOpen(false)} icon={item.icon}>
                {item.label}
              </NavButton>
            ))}
          </div>
        ) : null}
      </header>

      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-80 bg-(--primary) text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-(--primary-foreground) rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navLinks.map((item) => (
            <NavButton
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--primary-foreground) transition-colors mb-2"
              activeClassName="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gray-100 text-(--primary) transition-colors mb-2"
              icon={item.icon}
            >
              {item.label}
            </NavButton>
          ))}
        </nav>
      </aside>
    </>
  )
}
