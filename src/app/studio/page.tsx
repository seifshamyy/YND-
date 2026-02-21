import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export const revalidate = 60

export default async function StudioPage() {
    const about = await client.fetch(`*[_type == "about"][0] {
    title,
    content,
    headshots[]->{
      name,
      headshot
    }
  }`)

    return (
        <div className="flex flex-col gap-24 py-16 pb-32">
            <header className="fade-up">
                <h1 className="font-heading text-4xl text-foreground font-medium tracking-tight">
                    {about?.title || "The studio"}
                </h1>
            </header>

            {/* Headshots */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-up">
                {about?.headshots?.length > 0 ? (
                    about.headshots.map((partner: any, i: number) => (
                        <div key={i} className={`w-full aspect-[3/4] bg-foreground/5 relative overflow-hidden ${i === 1 ? 'md:mt-24' : ''}`}>
                            {partner.headshot ? (
                                <Image
                                    src={urlForImage(partner.headshot)?.url() as string}
                                    alt={partner.name}
                                    fill
                                    className="object-cover grayscale"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-end p-6">
                                    <span className="font-mono text-accent/50 text-sm tracking-widest uppercase pb-2">{partner.name} Placeholder</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <>
                        <div className="w-full aspect-[3/4] bg-foreground/5 flex flex-col justify-end p-6">
                            <span className="font-mono text-accent/50 text-sm tracking-widest uppercase pb-2">Partner 1 Placeholder</span>
                        </div>
                        <div className="w-full aspect-[3/4] bg-foreground/5 flex flex-col justify-end p-6 md:mt-24">
                            <span className="font-mono text-accent/50 text-sm tracking-widest uppercase pb-2">Partner 2 Placeholder</span>
                        </div>
                    </>
                )}
            </section>

            {/* Copy */}
            <section className="max-w-3xl mx-auto flex flex-col gap-8 fade-up text-lg md:text-xl leading-relaxed text-foreground font-body p-6 md:p-12 border border-foreground/10 bg-background/50">
                {about?.content ? (
                    <p className="whitespace-pre-wrap">{about.content}</p>
                ) : (
                    <>
                        <p>We work from two complementary positions within architecture.</p>
                        <p>One of us is driven by the design process itself, focused on concepts, narratives, and architectural thinking, informed by academic and design experience.</p>
                        <p>The other operates where ideas are translated into reality, with deep involvement in technical drawings, construction logic, and execution.</p>
                        <p className="font-medium font-heading">This is not a division of roles, but a system.</p>
                        <p>Ideas are tested through detail. Ambition is grounded in buildability.</p>
                        <p>What connects us is not style, but a shared commitment to architecture as a complete process—from concept to material, and from material to built form.</p>
                    </>
                )}
            </section>
        </div>
    )
}
