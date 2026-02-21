export const projectSchema = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'year',
            title: 'Year',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: ['Completed', 'Ongoing', 'Concept'],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Short editorial description (70–90 words).',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'tag',
                    type: 'string',
                    title: 'Hover Tag',
                    description: 'e.g. "Hero", "Facade", "Interior"',
                }
            ],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'contextImages',
            title: 'Context / Process Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    {
                        name: 'tag',
                        type: 'string',
                        title: 'Hover Tag',
                        description: 'e.g. "Process", "Context", "Detail"',
                    }
                ]
            }],
        },
        {
            name: 'detailImages',
            title: 'Detail Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    {
                        name: 'tag',
                        type: 'string',
                        title: 'Hover Tag',
                        description: 'e.g. "Detail", "Material"',
                    }
                ]
            }],
        },
    ],
}
