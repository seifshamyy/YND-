'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export function TransitionOverlay() {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const overlay = document.getElementById('page-transition-overlay')
        if (overlay) {
            // As soon as a route changes (component mounts/updates), fade the overlay out
            // We use a small delay to ensure the browser has painted the new DOM
            gsap.to(overlay, {
                opacity: 0,
                backdropFilter: 'blur(0px)',
                duration: 0.8,
                delay: 0.1,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(overlay, { pointerEvents: 'none' })
                }
            })
        }
    }, [pathname, isMounted])

    return (
        <div
            id="page-transition-overlay"
            className="fixed inset-0 z-[90] bg-background/80 pointer-events-none opacity-0"
            style={{ backdropFilter: 'blur(0px)' }}
        />
    )
}
