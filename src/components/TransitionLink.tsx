'use client'

import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode
    className?: string
    href: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    style?: React.CSSProperties
}

export function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        // Let the mobile menu or other onClick handlers fire first
        if (onClick) {
            onClick(e)
        }

        if (pathname === href) return // don't transition if already on page

        const overlay = document.getElementById('page-transition-overlay')

        if (overlay) {
            gsap.set(overlay, { pointerEvents: 'auto' })
            gsap.to(overlay, {
                opacity: 1,
                backdropFilter: 'blur(16px)',
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    router.push(href)
                }
            })
        } else {
            router.push(href)
        }
    }

    return (
        <a {...props} href={href} className={className} onClick={handleClick} style={props.style}>
            {children}
        </a>
    )
}
