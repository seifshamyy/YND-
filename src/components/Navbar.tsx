'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
    const pathname = usePathname()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'The studio', href: '/studio' },
        { name: 'Manifesto', href: '/manifesto' },
        { name: 'Start a project', href: '/contact' },
    ]

    return (
        <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-foreground/5 transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-24 mx-auto w-full max-w-[1600px]">
                {/* Brand */}
                <Link
                    href="/"
                    className="font-heading font-medium tracking-tight text-lg text-foreground transition-opacity hover:opacity-70"
                >
                    YND+
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex flex-row space-x-8 items-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`)
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm tracking-tight relative group transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-accent hover:text-foreground'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-foreground transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Mobile menu toggle (Minimal) */}
                <button className="md:hidden text-foreground">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                </button>
            </div>
        </header>
    )
}
