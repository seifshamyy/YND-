'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TypographyMatrixProps {
    text: string
    className?: string
    delay?: number
}

export function TypographyMatrix({ text, className = '', delay = 0 }: TypographyMatrixProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const words = containerRef.current?.querySelectorAll('.matrix-word')
        if (!words || words.length === 0) return

        // Wait a bit to ensure preloader is mostly done if this is high on the page
        const timer = setTimeout(() => {
            gsap.fromTo(words,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 1.0,
                    ease: 'power4.out',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    }
                }
            )
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [delay])

    // Split text into words, but preserve spaces between them
    const words = text.split(' ')

    return (
        <div ref={containerRef} className={`${className} flex flex-wrap`} aria-label={text}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.25em] mb-[0.1em] last:mr-0">
                    <span className="matrix-word inline-block translate-y-full">
                        {word}
                    </span>
                </div>
            ))}
        </div>
    )
}
