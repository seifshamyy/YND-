import { client } from '@/sanity/lib/client'
import { TransitionLink as Link } from '@/components/TransitionLink'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { TypographyMatrix } from '@/components/TypographyMatrix'
import { RevealImage } from '@/components/RevealImage'
import { KineticMarquee } from '@/components/KineticMarquee'
import { HoverImageReveal } from '@/components/HoverImageReveal'

export const revalidate = 60

export default async function Home() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    homepageStatement,
    heroImage,
    philosophyImage,
    expertiseList[] {
      title,
      image
    }
  }`)
  const projects = await client.fetch(`*[_type == "project"] | order(year desc)[0...4] {
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
      <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[90vh] min-h-[600px] -mt-24 mb-16 overflow-hidden bg-background">
        <RevealImage className="absolute inset-0 w-full h-full z-0 group" delay={2.6} parallax={true} parallaxSpeed={15}>
          {settings?.heroImage ? (
            <Image
              src={urlForImage(settings.heroImage)?.url() as string}
              alt="YND+ Studio Architecture"
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-accent/10 flex items-center justify-center">
              <span className="font-mono text-accent/50 text-sm tracking-widest uppercase">Hero Image Placeholder</span>
            </div>
          )}
          {/* Contrast Gradient Overlay (Inside mask to sync with reveal) */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[5] pointer-events-none" />
        </RevealImage>

        {/* Typography Overlay */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 z-10 max-w-4xl text-white pointer-events-none pr-6 drop-shadow-md">
          <TypographyMatrix
            text={statement}
            className="text-3xl md:text-5xl lg:text-[4.5rem] font-heading tracking-tight leading-[1.1] font-medium"
            delay={2.6} // Wait for preloader to finish (2s count + 0.6s exit)
          />
        </div>
      </section>

      {/* Kinetic Marquee */}
      <KineticMarquee text="Architecture • Interiors • Execution • Materiality •" speed={25} />

      {/* Philosophy Parallax Teaser */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 py-32 border-b border-foreground/10">
        <div className="flex flex-col gap-12 lg:sticky lg:top-32 h-fit max-w-xl">
          <h2 className="font-heading text-lg font-medium text-foreground tracking-tight">Our Position</h2>
          <p className="font-body text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground">
            YND+ is not interested in style. Style is the residue of decisions, not the objective.
            We work within reality. Climate, economy, labor, material supply, construction logic.
            <br /><br />
            These are not constraints — they are the project.
          </p>
          <div>
            <Link href="/manifesto" className="text-sm border-b border-foreground pb-1 hover:opacity-70 transition-opacity uppercase tracking-widest font-mono text-accent">
              Read the Manifesto
            </Link>
          </div>
        </div>

        <div className="w-full aspect-[3/4] lg:aspect-[4/5] relative overflow-hidden bg-accent/5">
          {settings?.philosophyImage ? (
            <Image
              src={urlForImage(settings.philosophyImage)?.url() as string}
              alt="Philosophy"
              fill
              className="object-cover grayscale"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-sm tracking-widest uppercase text-accent/50">
              Philosophy Parallax Image
            </div>
          )}
        </div>
      </section>

      {/* Interactive Expertise Hover Accordion */}
      <HoverImageReveal expertiseList={settings?.expertiseList} />

      {/* Featured Projects Gallery */}
      <section className="flex flex-col gap-24 py-16">
        <div className="flex justify-between items-end">
          <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight">Selected Work</h2>
          <Link href="/projects" className="text-sm border-b border-foreground pb-1 hover:opacity-70 transition-opacity uppercase tracking-widest font-mono text-accent">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-24 md:gap-y-32">
          {projects?.length > 0 ? (
            projects.map((project: any, i: number) => {
              // Asymmetrical staggering based on odd/even index
              const alignClass = i % 2 !== 0 ? 'md:mt-32' : ''
              const sizeClass = i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square md:aspect-[3/4] md:w-5/6 md:ml-auto'

              return (
                <Link key={project.slug.current} href={`/projects/${project.slug.current}`} className={`group flex flex-col gap-6 ${alignClass}`}>
                  <RevealImage className={`w-full bg-transparent transition-colors duration-500 ${sizeClass}`} staggerIndex={i}>
                    <div className="w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out group-hover:scale-[1.03] overflow-hidden">
                      {project.heroImage ? (
                        <Image
                          src={urlForImage(project.heroImage)?.url() as string}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-accent/5 flex items-center justify-center font-mono text-xs text-accent/50">Thumbnail Placeholder</div>
                      )}
                    </div>
                  </RevealImage>
                  <div className="flex justify-between items-start pt-2">
                    <div>
                      <h3 className="font-heading text-2xl text-foreground tracking-tight font-medium mb-1">{project.title}</h3>
                      <p className="font-body text-accent text-lg">{project.location}</p>
                    </div>
                    <span className="font-mono text-sm text-accent mix-blend-difference">{project.year}</span>
                  </div>
                </Link>
              )
            })
          ) : (
            <>
              {/* Fallback Block 1 */}
              <Link href="/projects/project-one" className="group flex flex-col gap-6">
                <div className="w-full aspect-[4/5] bg-foreground/5 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-accent/50 transition-transform duration-1000 ease-out group-hover:scale-[1.03]">Placeholder 1</div>
                </div>
              </Link>
              {/* Fallback Block 2 */}
              <Link href="/projects/project-two" className="group flex flex-col gap-6 md:mt-32 md:w-5/6 md:ml-auto">
                <div className="w-full aspect-[3/4] bg-foreground/5 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-accent/50 transition-transform duration-1000 ease-out group-hover:scale-[1.03]">Placeholder 2</div>
                </div>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Massive CTA Pre-Footer */}
      <section className="min-h-[50vh] flex items-center justify-center border-t border-foreground/10 py-32 px-4 group">
        <Link href="/contact" className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tight text-foreground text-center">
            Let's Talk.
          </h2>
        </Link>
      </section>
    </div>
  )
}

