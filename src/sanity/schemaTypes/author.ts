export const authorSchema = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'headshot',
            title: 'Headshot',
            type: 'image',
            options: { hotspot: true },
        },
    ],
}
