import Link from 'next/link'
import React from 'react'

interface INavLink {
  href: string,
  children: React.ReactNode
}

interface INavButton {
  onClick: () => void,
  children: React.ReactNode
}

export function NavLink({href, children}: INavLink) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}

export function NavButton({onClick, children}: INavButton) {
  
  return (
    <button onClick={onClick} 
      className="inline-block rounded-lg px-2 py-1 text-sm cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </button>
  )
}
