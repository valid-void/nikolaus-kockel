import type { CollectionConfig } from "payload";
import { generateSlugFromTitleByDefaultLocale, setDefaultTitle } from "../utils/generateSlug";

export const Category: CollectionConfig = {
    slug: 'category',
    admin: {
        useAsTitle: 'defaultTitle'
    },
    versions: {
        drafts: true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: false,
            localized: true
        },
        {
            name: 'defaultTitle',
            type: 'text',
            localized: false,
            admin: {
                readOnly: true,
                condition: () => false
            },
            hooks: {
                beforeValidate: [setDefaultTitle]
            }
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug',
            admin: {
                description: 'Used in the URL, e.g. /your-slug',
                // readOnly: true,
            },
            hooks: {
                beforeValidate: [generateSlugFromTitleByDefaultLocale]
            }
        }
    ]
}