import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}