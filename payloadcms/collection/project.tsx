import type { CollectionConfig } from 'payload'
import { generateSlugFromTitleByDefaultLocale, setDefaultTitle } from '../utils/generateSlug'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import { slateEditor } from '@payloadcms/richtext-slate'
// import { colorPickerField } from '@innovixx/payload-color-picker-field'

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
      type: "row",
      fields: [
        {
          type: "group",
          fields: [
            // colorPickerField({
            //     name: 'textColor',
            //     label: 'Primary Color',
            //     required: true,
            //     admin: {
            //         position: 'sidebar',
            //         description: 'Choose a color for this page',
            //     },
            // }),
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
              type: "row",
              fields: [
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'category',
                  hasMany: true,
                  admin: {
                    width: '50%',
                  }
                },
                {
                  name: 'year',
                  type: 'number',
                  admin: {
                    width: '50%',
                  }
                },
              ]
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              admin: {
                width: '50%',
              },
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
          type: "group",
          fields: [
            {
              name: 'preview',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Preview Image'
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Cover Image'
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Image Gallery',
              hasMany: true
            }
          ],
          admin: {
            width: '50%',
          }
        },
      ]
    },
    {
      name: 'content',
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
  ],
}