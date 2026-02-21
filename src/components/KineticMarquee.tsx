'use client'

import React from 'react'

interface KineticMarqueeProps {
    text: string
    speed?: number // Duration in seconds for one loop
    className?: string
}

export function KineticMarquee({ text, speed = 20, className = '' }: KineticMarqueeProps) {
    // We duplicate the text multiple times to ensure the screen is always filled
    // even on ultra-wide monitors, so the loop never breaks.
    const items = Array(8).fill(text)

    return (
        <div className={`relative flex overflow-hidden whitespace-nowrap w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-foreground text-background py-8 md:py-12 border-y border-background/20 select-none ${className}`}>
            <div
                className="flex items-center gap-12 sm:gap-16 lg:gap-24 uppercase font-heading font-medium tracking-tight text-4xl sm:text-6xl lg:text-8xl"
                style={{
                    animation: `marquee ${speed}s linear infinite`,
                    width: 'max-content'
                }}
            >
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        <span>{item}</span>
                        <span className="text-xl sm:text-3xl lg:text-4xl text-background/50 font-normal">✦</span>
                    </React.Fragment>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - (1rem * 3))); } /* rough calc to account for gaps */
                }
                /* Use a concrete translation amount to make it perfectly loop */
                @keyframes exactMarquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                `
            }} />
        </div>
    )
}
