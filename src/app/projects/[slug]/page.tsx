import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    title,
    location,
    year,
    status,
    description,
    heroImage {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    },
    contextImages[] {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    },
    detailImages[] {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    }
  }`, { slug })

    if (!project) {
        if (['project-one', 'project-two', 'project-three'].includes(slug)) {
            // Return hardcoded fallback for default slugs
            return (
                <div className="flex flex-col gap-24 py-16 pb-32 fade-up">
                    <header className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-foreground/10 pb-16">
                        <div className="md:col-span-8">
                            <h1 className="font-heading text-4xl md:text-6xl text-foreground font-medium tracking-tight capitalize">
                                {slug.replace('-', ' ')}
                            </h1>
                        </div>

                        <div className="md:col-span-4 flex flex-col gap-8 md:text-right">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs uppercase tracking-widest text-accent">Location</span>
                                <span className="font-body text-foreground">London, UK</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs uppercase tracking-widest text-accent">Status & Year</span>
                                <span className="font-body text-foreground">Completed, 2024</span>
                            </div>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-start-3 md:col-span-8">
                            <p className="font-body text-xl md:text-2xl leading-snug text-foreground">
                                A precise editorial description of the project goes here. It focuses on the realities of the site, the constraints, and how material decisions were made. The goal is clarity and execution. This section typically contains around 70 to 90 words describing the architectural intent.
                            </p>
                        </div>
                    </section>
                </div>
            )
        }
        notFound()
    }

    return (
        <div className="flex flex-col gap-24 py-16 pb-32 fade-up">
            {/* Header */}
            <header className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-foreground/10 pb-16">
                <div className="md:col-span-8">
                    <h1 className="font-heading text-4xl md:text-6xl text-foreground font-medium tracking-tight">
                        {project.title}
                    </h1>
                </div>

                <div className="md:col-span-4 flex flex-col gap-8 md:text-right">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent">Location</span>
                        <span className="font-body text-foreground">{project.location}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent">Status & Year</span>
                        <span className="font-body text-foreground">{project.status}, {project.year}</span>
                    </div>
                </div>
            </header>

            {/* Description */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-start-3 md:col-span-8">
                    <p className="font-body text-xl md:text-2xl leading-snug text-foreground whitespace-pre-wrap">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* Hero Image */}
            {project.heroImage && (
                <section className="w-full bg-transparent relative flex items-center justify-center overflow-hidden group">
                    <Image
                        src={urlForImage(project.heroImage)?.url() as string}
                        alt={`Hero image for ${project.title}`}
                        width={project.heroImage.asset?.metadata?.dimensions?.width || 1920}
                        height={project.heroImage.asset?.metadata?.dimensions?.height || 1080}
                        priority
                        className="w-full h-auto max-h-[85vh] object-contain shadow-sm"
                    />
                    {project.heroImage.tag && (
                        <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                            <span className="font-mono text-xs uppercase tracking-widest bg-background/90 text-foreground px-3 py-1.5 backdrop-blur-sm shadow-sm">
                                {project.heroImage.tag}
                            </span>
                        </div>
                    )}
                </section>
            )}

            {/* Context Images */}
            {project.contextImages && project.contextImages.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-start">
                    {project.contextImages.map((img: any, i: number) => (
                        <div key={i} className={`w-full bg-transparent relative flex items-center justify-center overflow-hidden group ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                            <Image
                                src={urlForImage(img)?.url() as string}
                                alt={`Context image ${i + 1} for ${project.title}`}
                                width={img.asset?.metadata?.dimensions?.width || 1200}
                                height={img.asset?.metadata?.dimensions?.height || 1200}
                                className="w-full h-auto max-h-[85vh] object-contain shadow-sm"
                            />
                            {img.tag && (
                                <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                                    <span className="font-mono text-xs uppercase tracking-widest bg-background/90 text-foreground px-3 py-1.5 backdrop-blur-sm shadow-sm">
                                        {img.tag}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Details Images */}
            {project.detailImages && project.detailImages.length > 0 && (
                <section className="flex flex-col gap-12">
                    {project.detailImages.map((img: any, i: number) => (
                        <div key={i} className="w-full bg-transparent relative flex items-center justify-center overflow-hidden group">
                            <Image
                                src={urlForImage(img)?.url() as string}
                                alt={`Detail image ${i + 1} for ${project.title}`}
                                width={img.asset?.metadata?.dimensions?.width || 1920}
                                height={img.asset?.metadata?.dimensions?.height || 1080}
                                className="w-full h-auto max-h-[85vh] object-contain shadow-sm"
                            />
                            {img.tag && (
                                <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                                    <span className="font-mono text-xs uppercase tracking-widest bg-background/90 text-foreground px-3 py-1.5 backdrop-blur-sm shadow-sm">
                                        {img.tag}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}
        </div>
    )
}
