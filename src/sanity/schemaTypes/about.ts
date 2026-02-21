export const aboutSchema = {
    name: 'about',
    title: 'About Text ("The studio")',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'The studio',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 10,
        },
        {
            name: 'headshots',
            title: 'Partner Headshots',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'author' }] }],
            validation: (Rule: any) => Rule.max(2),
        },
    ],
}
