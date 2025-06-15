import { ImagesIcon } from '@sanity/icons'
import { defineField, defineArrayMember } from 'sanity'

export const documentContent = defineField({
      name: 'documentContent',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'styledImage' },
        { type: 'projectList' },
        { type: 'eventList' },
        { type: 'insertGallery' },
      ]
    })

export const insertGallery = defineField({
      name: 'insertGallery',
      title: 'Insert Gallery',
      type: 'object',
      icon: ImagesIcon,
      fields: [
        { 
          title: 'Insert Gallery here',
          name: 'insertGallery',
          type: 'boolean',
          initialValue: true,
          readOnly: true,
          hidden: true
        }
      ],
      preview: {
        prepare() {
            const title = "Image Gallery"
            return { title, subtitle: 'Edit Gallery at tap "Media"' }
        },
    },
    })

export const simpleBlock = defineField({
      name: "simpleBlock",
      description:
        "Used both for the <meta> description tag for SEO, and the list preview text.",
      title: "Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              defineField({
                type: "object",
                name: "link",
                fields: [
                  {
                    type: "string",
                    name: "href",
                    title: "URL",
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    })