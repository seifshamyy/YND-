import { client } from '@/sanity/lib/client'

export const revalidate = 60

export default async function ContactPage() {
    const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    contactEmail,
    whatsappLink,
    calendlyLink
  }`)

    const email = settings?.contactEmail || "yndplus@outlook.com"
    const whatsapp = settings?.whatsappLink || "https://api.whatsapp.com/send?phone=201143909129"
    const calendly = settings?.calendlyLink || "https://calendly.com"

    return (
        <div className="flex flex-col gap-24 py-16 min-h-[70vh] fade-up">
            <header className="border-b border-foreground/10 pb-16">
                <h1 className="font-heading text-4xl md:text-5xl text-foreground font-medium tracking-tight mb-4">Start a project</h1>
                <p className="font-body text-xl text-accent max-w-2xl">
                    We operate with strict capacity to ensure execution quality. Reach out to discuss timelines, scale, and intent.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Direct Meeting</h2>
                    <a href={calendly} target="_blank" rel="noopener noreferrer" className="font-heading text-2xl tracking-tight text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 group">
                        Book via Calendly
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Instant Connectivity</h2>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-heading text-2xl tracking-tight text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 group">
                        Message WhatsApp
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-accent">General Inquiries</h2>
                    <a href={`mailto:${email}`} className="font-heading text-2xl tracking-tight text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 group">
                        {email}
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </section>
        </div>
    )
}
