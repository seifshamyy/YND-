'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealImageProps {
    children: React.ReactNode
    className?: string
    delay?: number
    parallax?: boolean
    parallaxSpeed?: number
    staggerIndex?: number
}

export function RevealImage({
    children,
    className = "",
    delay = 0,
    parallax = false,
    parallaxSpeed = 15, // Percentage of movement
    staggerIndex = 0
}: RevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const container = containerRef.current
        const imageWrapper = imageWrapperRef.current

        if (!container || !imageWrapper) return

        // 1. Initial State:
        // Set up the clip-path to completely hide the image from the top down (initially flattened to bottom)
        gsap.set(container, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' })
        // Set up the internal scale to be slightly zoomed in
        gsap.set(imageWrapper, { scale: 1.15 })

        // 2. The Unveil Animation
        // Delay calculations based on preloader or stagger indices
        const timer = setTimeout(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%', // Trigger slightly earlier for a better feel
                    toggleActions: 'play none none none'
                }
            })

            tl.to(container, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.6,
                ease: "power4.out"
            }, 0)

            tl.to(imageWrapper, {
                scale: 1,
                duration: 2.0, // Scale takes slightly longer than the mask for dramatic effect
                ease: "power3.out"
            }, 0)

            // 3. Optional Parallax effect
            if (parallax) {
                gsap.to(imageWrapper, {
                    yPercent: parallaxSpeed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom", // Start moving as soon as it enters viewport
                        end: "bottom top",   // End when it leaves
                        scrub: true         // Tie animation strictly to scroll progress
                    }
                })
            }

        }, (delay * 1000) + (staggerIndex * 200))

        return () => {
            clearTimeout(timer)
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === container) t.kill()
            })
        }
    }, [delay, parallax, parallaxSpeed, staggerIndex])

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            <div ref={imageWrapperRef} className="w-full h-full relative origin-center">
                {children}
            </div>
        </div>
    )
}
