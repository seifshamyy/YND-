'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const mouseX = useRef(window.innerWidth / 2)
    const mouseY = useRef(window.innerHeight / 2)
    const pathname = usePathname()

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        // Base mouse movement
        const onMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX
            mouseY.current = e.clientY
        }

        window.addEventListener('mousemove', onMouseMove)

        // Smooth follow logic using GSAP ticker instead of just onMouseMove
        // This makes the cursor extremely buttery
        const renderCursor = () => {
            gsap.to(cursor, {
                x: mouseX.current,
                y: mouseY.current,
                duration: 0.15,
                ease: 'power2.out',
            })
        }

        gsap.ticker.add(renderCursor)

        const handleHover = () => {
            const interactables = document.querySelectorAll('a, button')
            interactables.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursor, {
                        scale: 0.1,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power3.out'
                    })
                })
                el.addEventListener('mouseleave', () => {
                    gsap.to(cursor, {
                        scale: 1,
                        opacity: 0.65,
                        duration: 0.3,
                        ease: 'power3.out'
                    })
                })
            })
        }

        // Delay setup to allow Next.js to mount elements
        const timer = setTimeout(handleHover, 500)

        // Reset scale and opacity on route change just in case the mouse clicked a link to navigate
        gsap.to(cursor, { scale: 1, opacity: 0.65, duration: 0.1 })

        // Check if device is touch, we hide the custom cursor completely
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) {
            cursor.style.display = 'none'
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            gsap.ticker.remove(renderCursor)
            clearTimeout(timer)
        }
    }, [pathname])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block backdrop-invert backdrop-grayscale border border-white/20"
            style={{ opacity: 0.65 }}
        />
    )
}
