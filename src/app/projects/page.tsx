import { TransitionLink as Link } from '@/components/TransitionLink'
import { client } from '@/sanity/lib/client'

export const revalidate = 60 // revalidate every minute

export default async function ProjectsIndex() {
    const projects = await client.fetch(`*[_type == "project"] | order(year desc) {
    slug,
    title,
    location,
    year,
    status
  }`)

    // Fallback to initial hardcoded data if CMS is empty
    const displayProjects = projects.length > 0 ? projects : [
        { slug: { current: 'project-one' }, title: 'Project One', location: 'London, UK', year: '2024', status: 'Completed' },
        { slug: { current: 'project-two' }, title: 'Project Two', location: 'Berlin, DE', year: '2023', status: 'Completed' },
        { slug: { current: 'project-three' }, title: 'Project Three', location: 'Milan, IT', year: '2025', status: 'Ongoing' },
    ]

    return (
        <div className="flex flex-col gap-16 min-h-[70vh] py-16">
            <h1 className="font-heading text-4xl text-foreground font-medium tracking-tight fade-up">Projects</h1>

            <div className="flex flex-col border-t border-foreground/10 fade-up">
                {displayProjects.map((project: any) => (
                    <Link
                        key={project.slug.current}
                        href={`/projects/${project.slug.current}`}
                        className="group grid grid-cols-2 md:grid-cols-12 gap-4 py-8 border-b border-foreground/10 hover:bg-foreground/5 transition-colors items-center"
                    >
                        <div className="md:col-span-6 pl-4 font-heading text-xl text-foreground tracking-tight group-hover:pl-6 transition-all duration-300">
                            {project.title}
                        </div>
                        <div className="hidden md:block md:col-span-3 font-body text-accent">
                            {project.location}
                        </div>
                        <div className="md:col-span-2 font-mono text-sm text-accent text-right md:text-left">
                            {project.status}
                        </div>
                        <div className="hidden md:block md:col-span-1 font-mono text-sm text-accent text-right pr-4">
                            {project.year}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
