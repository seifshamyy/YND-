import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export const revalidate = 60

export default async function Home() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    homepageStatement,
    heroImage
  }`)
  const projects = await client.fetch(`*[_type == "project"] | order(year desc)[0...2] {
    slug,
    title,
    location,
    year,
    status,
    heroImage {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    }
  }`)

  const statement = settings?.homepageStatement || "Architecture and interiors that work — and last."

  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
      <section className="flex flex-col gap-12 pt-16 min-h-[85vh] justify-center fade-up">
        <div className="w-full bg-transparent relative flex items-center justify-center overflow-hidden group">
          {settings?.heroImage ? (
            <Image
              src={urlForImage(settings.heroImage)?.url() as string}
              alt="YND+ Studio Architecture"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          ) : (
            <div className="w-full aspect-video bg-accent/5 flex items-center justify-center">
              <span className="font-mono text-accent/50 text-sm tracking-widest uppercase">Hero Image Placeholder</span>
            </div>
          )}
        </div>

        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading tracking-tight leading-tight text-foreground font-medium">
            {statement}
          </h1>
        </div>
      </section>

      {/* Manifesto Teaser */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 py-16 border-t border-foreground/10 fade-up">
        <div className="md:col-span-4">
          <h2 className="font-heading text-lg font-medium text-foreground tracking-tight">Our Position</h2>
        </div>
        <div className="md:col-span-8 flex flex-col gap-8 max-w-2xl">
          <p className="font-body text-xl md:text-2xl lg:text-3xl leading-snug text-foreground">
            YND+ is not interested in style. Style is the residue of decisions, not the objective.
            We work within reality. Climate, economy, labor, material supply, construction logic.
            These are not constraints — they are the project.
          </p>
          <div>
            <Link href="/manifesto" className="text-sm border-b border-foreground pb-1 hover:opacity-70 transition-opacity uppercase tracking-widest font-mono text-accent">
              Read the Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="flex flex-col gap-16 py-16 border-t border-foreground/10 fade-up">
        <div className="flex justify-between items-end">
          <h2 className="font-heading text-lg font-medium tracking-tight">Selected Work</h2>
          <Link href="/projects" className="text-sm text-accent hover:text-foreground transition-colors">
            All projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {projects?.length > 0 ? (
            projects.map((project: any, i: number) => (
              <Link key={project.slug.current} href={`/projects/${project.slug.current}`} className={`group flex flex-col gap-4 ${i === 1 ? 'md:mt-24' : ''}`}>
                <div className="w-full bg-transparent relative overflow-hidden transition-colors duration-500">
                  <div className="w-full relative flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    {project.heroImage ? (
                      <Image
                        src={urlForImage(project.heroImage)?.url() as string}
                        alt={project.title}
                        width={project.heroImage.asset?.metadata?.dimensions?.width || 1200}
                        height={project.heroImage.asset?.metadata?.dimensions?.height || 1200}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full aspect-[4/5] flex items-center justify-center font-mono text-xs text-accent/50">Thumbnail Placeholder</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-lg text-foreground tracking-tight font-medium">{project.title}</h3>
                    <p className="font-body text-accent">{project.location}</p>
                  </div>
                  <span className="font-mono text-xs text-accent">{project.year}</span>
                </div>
              </Link>
            ))
          ) : (
            <>
              {/* Fallback Project 1 */}
              <Link href="/projects/project-one" className="group flex flex-col gap-4">
                <div className="w-full aspect-[4/5] bg-foreground/5 relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-accent/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-accent/50">Thumbnail Placeholder</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-lg text-foreground tracking-tight font-medium">Project One</h3>
                    <p className="font-body text-accent">Residential, Concrete</p>
                  </div>
                  <span className="font-mono text-xs text-accent">2024</span>
                </div>
              </Link>
              {/* Fallback Project 2 */}
              <Link href="/projects/project-two" className="group flex flex-col gap-4 md:mt-24">
                <div className="w-full aspect-[4/5] bg-foreground/5 relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-accent/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-accent/50">Thumbnail Placeholder</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-lg text-foreground tracking-tight font-medium">Project Two</h3>
                    <p className="font-body text-accent">Commercial, Steel</p>
                  </div>
                  <span className="font-mono text-xs text-accent">2023</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
