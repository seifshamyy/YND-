'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

export function SmoothScroller() {
    const pathname = usePathname()

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Give Next.js a tiny moment to render the new DOM elements before GSAP grabs them
        const timer = setTimeout(() => {
            const fadeUps = document.querySelectorAll('.fade-up')

            fadeUps.forEach((elem) => {
                // Reset to initial state in case it was already animated
                gsap.set(elem, { y: 10, opacity: 0 })

                gsap.to(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                })
            })
            ScrollTrigger.refresh()
        }, 100)

        return () => {
            clearTimeout(timer)
            ScrollTrigger.getAll().forEach((st) => st.kill())
        }
    }, [pathname])

    return null
}
