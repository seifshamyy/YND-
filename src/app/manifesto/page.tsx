import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

export default async function ManifestoPage() {
    const manifesto = await client.fetch(`*[_type == "manifesto"][0]`)

    return (
        <div className="flex flex-col gap-16 py-16 md:py-32 fade-up">
            <header className="max-w-4xl">
                <h1 className="font-heading text-4xl text-foreground font-medium tracking-tight mb-8">
                    {manifesto?.title || "Manifesto"}
                </h1>
            </header>

            <section className="max-w-4xl flex flex-col gap-12 font-body text-xl md:text-3xl leading-snug text-foreground">
                {manifesto?.content ? (
                    <div className="space-y-12">
                        <PortableText value={manifesto.content} />
                    </div>
                ) : (
                    <>
                        <p>YND+ is not interested in style. Style is the residue of decisions, not the objective.</p>
                        <p>We work within reality. Climate, economy, labor, material supply, construction logic. These are not constraints — they are the project.</p>
                        <p>Sustainability is not an image applied at the end. It is embedded in how we choose, source, assemble, and repeat. Less transport. Less waste. Fewer gestures. More intelligence.</p>
                        <p>We operate locally because locality is efficient. It shortens distance, reduces friction, and increases responsibility. Local is not nostalgic. It is strategic.</p>
                        <p>The Mediterranean is not a reference. It is an operating system. Sun, heat, shadow, density, reuse. Centuries of optimization before the word &ldquo;sustainability&rdquo; existed.</p>
                        <p>Material is not symbolic. It is physical, measurable, aging, and political. We use it for what it does, not what it represents.</p>
                        <p>YND+ designs by aligning forces. Context, structure, program, and construction are negotiated until architecture becomes inevitable.</p>
                        <p>We design and build because separation produces waste. Control produces clarity. Clarity produces durability.</p>
                        <p className="font-medium font-heading text-2xl md:text-4xl mt-8">
                            YND+ is not searching for icons. We are interested in systems that work and spaces that remain relevant longer than their moment.
                        </p>
                    </>
                )}
            </section>
        </div>
    )
}
