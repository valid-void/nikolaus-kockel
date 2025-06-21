import type { CollectionConfig } from 'payload'
import { generateSlugFromTitleByDefaultLocale, setDefaultTitle } from '../utils/generateSlug'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import { slateEditor } from '@payloadcms/richtext-slate'

export const Project: CollectionConfig = {
  slug: 'project',
  admin: {
    useAsTitle: 'defaultTitle'
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: "About",
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
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
            },
            {
              name: 'year',
              type: 'number'
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'category',
              hasMany: true
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              editor: slateEditor({
                admin: {
                  leaves: [
                    'bold',
                    'italic'
                  ],
                  elements: [
                    'link'
                  ]
                }
              })
            },
          ]
        },
        {
          label: "Media",
          fields: [
            {
              name: 'preview',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Preview Image',
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Cover Image',
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Image Gallery',
              hasMany: true
            }
          ]
        },
        {
          label: "Content",
          fields: [
            {
              name: 'caption',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          {
                            name: 'alignment',
                            type: 'select',
                            options: [
                              { label: 'Float left', value: 'left' },
                              { label: 'Full', value: 'full' },
                              { label: 'Float right', value: 'right' },
                            ],
                            defaultValue: 'full'
                          }

                        ]
                      }
                    }
                  })
                ]
              }),
            }
          ]
        }
      ]
    }

  ],
}