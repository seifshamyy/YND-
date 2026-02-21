import { type SchemaTypeDefinition } from 'sanity'

import { projectSchema } from './project'
import { authorSchema } from './author'
import { siteSettingsSchema } from './siteSettings'
import { manifestoSchema } from './manifesto'
import { aboutSchema } from './about'

export const schemaTypes: SchemaTypeDefinition[] = [
    projectSchema,
    authorSchema,
    siteSettingsSchema,
    manifestoSchema,
    aboutSchema,
]
