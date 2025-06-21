import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { Project } from './payloadcms/collection/project'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { Media } from './payloadcms/collection/media'
import { Category } from './payloadcms/collection/category'
// import { Color } from './payloadcms/collection/color'

export const DEFAULT_LOCALE = "de";

export default buildConfig({
    localization: {
        defaultLocale: 'de',
        locales: [
            {
                label: 'Deutsch',
                code: 'de',
            },
            {
                label: 'English',
                code: 'en',
            }
        ],
    },
    i18n: {
        fallbackLanguage: 'de',
        supportedLanguages: { de, en },
    },

    // If you'd like to use Rich Text, pass your editor here
    editor: lexicalEditor(),

    // Define and configure your collections in this array
    collections: [
        Project,
        Category,
        Media,
        // Color
    ],

    // Your Payload secret - should be a complex and secure string, unguessable
    secret: process.env.PAYLOAD_SECRET || '',
    // Whichever Database Adapter you're using should go here
    // Configure the Postgres adapter here
    db: postgresAdapter({
        // Postgres-specific arguments go here.
        // `pool` is required.
        pool: {
            connectionString: process.env.DATABASE_URI,
        },
    }),
    // If you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.
    // This is optional - if you don't need to do these things,
    // you don't need it!
    sharp,
})