import { client } from '@/sanity/lib/client'

export const revalidate = 60

export async function Footer() {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{ contactEmail }`)
    const email = settings?.contactEmail || "yndplus@outlook.com"
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full mt-32 border-t border-foreground/10 pb-12 pt-16 px-6 md:px-12 lg:px-24 mx-auto max-w-[1600px] relative overflow-hidden group">
            {/* Architectural Grid Motif (Background) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 transition-opacity duration-700 group-hover:opacity-10 z-0 flex flex-col justify-end">
                <div className="w-full h-1/2 border-t border-foreground" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)' }}></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-heading font-medium tracking-tight text-foreground text-lg">YND+</span>
                    <span className="font-mono text-xs text-accent">System Operational.</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-sm text-accent">
                    <div className="flex flex-col gap-2">
                        <span className="text-foreground tracking-tight mb-1">Contact</span>
                        <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">{email}</a>
                        <a href="/contact" className="hover:text-foreground transition-colors">Start a project</a>
                    </div>
                    <div className="flex flex-col gap-2 justify-end">
                        <span className="font-mono text-xs">© {currentYear} YND+ Architecture. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
