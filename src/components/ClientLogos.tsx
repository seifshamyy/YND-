'use client'

import React from 'react'

const fallbackClients = [
    { name: 'AMAN', style: 'font-heading font-light tracking-[0.3em] uppercase' },
    { name: 'Four Seasons', style: 'font-body font-medium tracking-tight' },
    { name: 'EMAAR', style: 'font-heading font-medium tracking-[0.1em] uppercase' },
    { name: 'Knight Frank', style: 'font-heading italic tracking-wider' },
    { name: 'LVMH', style: 'font-body font-bold tracking-[0.2em] uppercase' },
    { name: 'Ritz-Carlton', style: 'font-heading font-medium tracking-widest uppercase' },
]

interface ClientItem {
    name: string
    style: string
}

interface ClientLogosProps {
    clientList?: ClientItem[]
}

export function ClientLogos({ clientList }: ClientLogosProps) {
    const items = clientList?.length ? clientList : fallbackClients

    // Duplicate the array for an infinite loop effect
    const duplicatedClients = [...items, ...items, ...items]

    return (
        <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-4 md:py-8 border-y border-foreground/10 bg-background overflow-hidden flex flex-col gap-6 select-none group">

            <div className="container mx-auto px-6 md:px-12 flex justify-center">
                <span className="font-mono text-xs tracking-widest uppercase text-accent/60">Selected Clients & Partners</span>
            </div>

            <div className="relative flex overflow-hidden whitespace-nowrap w-full mask-edges">
                <div
                    className="flex items-center gap-16 md:gap-24 lg:gap-32 w-max animate-marquee-slow hover:pause"
                    style={{ animationDuration: '60s' }}
                >
                    {duplicatedClients.map((client, i) => (
                        <div key={i} className={`text-xl md:text-2xl lg:text-3xl text-foreground opacity-60 hover:opacity-100 transition-opacity duration-300 ${client.style}`}>
                            {client.name}
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .mask-edges {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
                @keyframes marquee-slow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-33.333% - (2rem * ${items.length}))); }
                }
                .animate-marquee-slow {
                    animation: marquee-slow linear infinite;
                    will-change: transform;
                    transform: translateZ(0);
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
                `
            }} />
        </section>
    )
}
