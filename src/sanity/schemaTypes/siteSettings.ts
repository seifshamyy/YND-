export const siteSettingsSchema = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            initialValue: 'YND+',
        },
        {
            name: 'homepageStatement',
            title: 'Homepage Statement',
            type: 'string',
            initialValue: 'Architecture and interiors that work — and last.',
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'philosophyImage',
            title: 'Philosophy section Parallax Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'expertiseList',
            title: 'Expertise List',
            description: 'List of expertise areas and their background images.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
                    ]
                }
            ]
        },
        {
            name: 'clientList',
            title: 'Selected Clients & Partners',
            description: 'List of client names and their typographic styles for the marquee.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Client Name', type: 'string' },
                        {
                            name: 'style',
                            title: 'Tailwind Typographic Classes',
                            type: 'string',
                            description: 'E.g., "font-heading font-light tracking-widest uppercase" or "font-body italic".',
                            initialValue: 'font-heading font-medium tracking-tight'
                        }
                    ]
                }
            ]
        },
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            initialValue: 'yndplus@outlook.com',
        },
        {
            name: 'whatsappLink',
            title: 'WhatsApp / Booking Link',
            description: 'Provide the full URL (e.g., https://api.whatsapp.com/send?phone=201143909129 or a Calendly link).',
            type: 'url',
            validation: (Rule: any) => Rule.uri({
                scheme: ['http', 'https']
            })
        },
        {
            name: 'calendlyLink',
            title: 'Calendly Link',
            type: 'url',
        },
    ],
}
