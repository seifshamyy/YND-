'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const mouseX = useRef(0)
    const mouseY = useRef(0)
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return
        const cursor = cursorRef.current
        if (!cursor) return

        // Set initial position safely without triggering teleport on route change
        if (mouseX.current === 0 && mouseY.current === 0) {
            mouseX.current = window.innerWidth / 2
            mouseY.current = window.innerHeight / 2
        }

        // Base mouse movement
        const onMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX
            mouseY.current = e.clientY

            // If the cursor was invisible before moving, ensure it shows up (helpful if mouse enters viewport)
            if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
                gsap.to(cursor, { opacity: 0.65, duration: 0.3 })
            }
        }

        window.addEventListener('mousemove', onMouseMove)

        // Smooth follow logic using GSAP ticker
        const renderCursor = () => {
            // Disable cursor rendering on sanity admin pages
            if (window.location.pathname.startsWith('/studio')) {
                cursor.style.display = 'none'
                return
            } else {
                cursor.style.display = 'block'
            }

            gsap.to(cursor, {
                x: mouseX.current,
                y: mouseY.current,
                duration: 0.15,
                ease: 'power2.out',
            })
        }

        gsap.ticker.add(renderCursor)

        // Event delegation for hover states (much more robust than querySelectorAll loops)
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a, button')) {
                gsap.to(cursor, {
                    scale: 0.1,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.out'
                })
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a, button')) {
                gsap.to(cursor, {
                    scale: 1,
                    opacity: 0.65,
                    duration: 0.3,
                    ease: 'power3.out'
                })
            }
        }

        window.addEventListener('mouseover', onMouseOver)
        window.addEventListener('mouseout', onMouseOut)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', onMouseOver)
            window.removeEventListener('mouseout', onMouseOut)
            gsap.ticker.remove(renderCursor)
        }
    }, [isMounted]) // We do NOT put pathname here, so it doesn't reset/re-run on navigation!

    if (!isMounted || pathname?.startsWith('/studio')) return null

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block backdrop-invert backdrop-grayscale border border-white/20"
            style={{ opacity: 0 }} // Start invisible until mouse moves
        />
    )
}
