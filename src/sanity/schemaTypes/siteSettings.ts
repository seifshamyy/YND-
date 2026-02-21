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
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            initialValue: 'yndplus@outlook.com',
        },
        {
            name: 'whatsappNumber',
            title: 'WhatsApp Number',
            type: 'string',
        },
        {
            name: 'calendlyLink',
            title: 'Calendly Link',
            type: 'url',
        },
    ],
}
