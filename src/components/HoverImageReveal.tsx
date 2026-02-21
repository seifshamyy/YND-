'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { urlForImage } from '@/sanity/lib/image'

interface ExpertiseItem {
    title: string
    image?: any
    imageStr?: string
}

const fallbackServices: ExpertiseItem[] = [
    {
        title: 'Architecture',
        imageStr: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop'
    },
    {
        title: 'Interior Design',
        imageStr: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop'
    },
    {
        title: 'Masterplanning',
        imageStr: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
    }
]

interface HoverImageRevealProps {
    expertiseList?: ExpertiseItem[]
}

export function HoverImageReveal({ expertiseList }: HoverImageRevealProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!imageContainerRef.current) return

        const ctx = gsap.context(() => {
            if (hoveredIndex !== null) {
                gsap.to('.service-image', {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                gsap.to(`.service-image-${hoveredIndex}`, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out'
                })
            } else {
                gsap.to('.service-image', {
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            }
        }, imageContainerRef)

        return () => ctx.revert()
    }, [hoveredIndex])

    const items = expertiseList?.length ? expertiseList : fallbackServices

    return (
        <section className="relative w-full py-32 border-t border-foreground/10 group/section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 mix-blend-difference text-background">
                <div className="md:col-span-4 transition-opacity duration-500" style={{ opacity: hoveredIndex !== null ? 0 : 1 }}>
                    <h2 className="font-heading text-lg font-medium tracking-tight text-white mb-8">Expertise</h2>
                </div>

                <div className="md:col-span-8 flex flex-col w-full">
                    {items.map((service, i) => {
                        const rowId = String(i + 1).padStart(2, '0')
                        return (
                            <div
                                key={i}
                                className="flex items-baseline justify-between py-8 border-b border-white/20 cursor-pointer group/row transition-colors"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-baseline gap-6">
                                    <span className="font-mono text-sm tracking-widest opacity-50 text-white">{rowId}</span>
                                    <span className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white group-hover/row:translate-x-4 transition-transform duration-500 ease-out">{service.title}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Absolute positioning for the reveal images, acts as the background */}
            <div
                ref={imageContainerRef}
                className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none transition-opacity duration-700"
                style={{ opacity: hoveredIndex !== null ? 1 : 0 }}
            >
                {/* Dark overlay to make white text pop */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />

                {items.map((service, i) => {
                    const imgSrc = service.image ? (urlForImage(service.image)?.url() as string) : (service.imageStr as string)
                    return (
                        <div
                            key={i}
                            className={`service-image service-image-${i} absolute inset-0 w-full h-full opacity-0 scale-105`}
                        >
                            <Image
                                src={imgSrc}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
