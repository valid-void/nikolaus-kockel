import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: 'media',
    upload: true,
    admin: {
        useAsTitle: 'filename'
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: false
        }
    ]
}