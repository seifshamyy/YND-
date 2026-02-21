'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'The studio', href: '/studio' },
        { name: 'Manifesto', href: '/manifesto' },
        { name: 'Start a project', href: '/contact' },
    ]

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isOpen ? 'bg-transparent border-transparent' : 'bg-background/90 backdrop-blur-sm border-b border-foreground/5'}`}>
                <div className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-24 mx-auto w-full max-w-[1600px]">
                    {/* Brand */}
                    <Link
                        href="/"
                        className={`font-heading font-medium tracking-tight text-lg transition-colors duration-300 z-[60] ${isOpen ? 'text-background' : 'text-foreground hover:opacity-70'}`}
                    >
                        YND+
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Mobile menu toggle */}
                    <button
                        className={`md:hidden z-[60] p-2 -mr-2 transition-colors duration-300 ${isOpen ? 'text-background' : 'text-foreground'}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-[1.5px] bg-currentColor transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2.5px] -translate-y-[1px]' : ''}`} />
                            <span className={`w-full h-[1.5px] bg-currentColor transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
                            <span className={`w-full h-[1.5px] bg-currentColor transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2.5px] translate-y-[1px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-foreground text-background flex flex-col justify-center px-6 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
            >
                <nav className="flex flex-col space-y-8">
                    {navLinks.map((link, i) => {
                        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`)
                        return (
                            <div key={link.name} className="overflow-hidden">
                                <Link
                                    href={link.href}
                                    className={`block text-4xl font-heading tracking-tight transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${isActive ? 'opacity-100' : 'opacity-50'}`}
                                    style={{ transitionDelay: isOpen ? `${i * 100 + 100}ms` : '0ms' }}
                                >
                                    {link.name}
                                </Link>
                            </div>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}
