'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export function Preloader() {
    const [counter, setCounter] = useState(0)
    const preloaderRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Lock scroll while preloading
        document.body.style.overflow = 'hidden'

        // Step 1: Count up to 100
        const duration = 2.0 // seconds
        const startTime = Date.now()

        const updateCounter = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)

            // Ease out expo for the counting (starts fast, slows down at the end)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            const currentCount = Math.floor(easeProgress * 100)

            setCounter(currentCount)

            if (progress < 1) {
                requestAnimationFrame(updateCounter)
            } else {
                setCounter(100)
                // Step 2: Animate out after hitting 100
                animateOut()
            }
        }

        requestAnimationFrame(updateCounter)

        const animateOut = () => {
            const tl = gsap.timeline()

            // Fade out the text first
            tl.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.inOut",
                delay: 0.2 // Give it a tiny pause at "100" so the user registers it
            })

            // Slide the preloader up to reveal the site using clip-path for a sharper edge
            tl.to(preloaderRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = 'none'
                    }
                    // Unlock scroll
                    document.body.style.overflow = ''
                }
            }, "-=0.2")
        }

    }, [])

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[999] bg-foreground text-background flex flex-col justify-end p-6 md:p-12 lg:p-24"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }} // Initial state full
        >
            <div ref={textRef} className="flex justify-between items-end w-full">
                <span className="font-heading text-sm md:text-base uppercase tracking-widest text-background/50">
                    Loading Experience
                </span>
                <span className="font-mono text-6xl md:text-8xl lg:text-[10vw] leading-none tracking-tighter">
                    {counter}
                </span>
            </div>
        </div>
    )
}
