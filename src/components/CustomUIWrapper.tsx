'use client'

import { usePathname } from 'next/navigation'
import { Preloader } from './Preloader'
import { TransitionOverlay } from './TransitionOverlay'
import { LenisScroll } from './LenisScroll'
import { CustomCursor } from './CustomCursor'
import { SmoothScroller } from './SmoothScroller'

export function CustomUIWrapper() {
    const pathname = usePathname()

    // If we are anywhere inside the Sanity admin studio, do not render ANY custom global UI
    if (pathname?.startsWith('/admin')) {
        return null
    }

    return (
        <>
            <Preloader />
            <TransitionOverlay />
            <LenisScroll />
            <CustomCursor />
            <SmoothScroller />
        </>
    )
}
