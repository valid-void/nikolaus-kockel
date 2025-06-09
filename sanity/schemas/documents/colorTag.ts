import { defineField } from 'sanity'
import {DropIcon} from '@sanity/icons'

export default defineField({
    name: 'colorTag',
    title: 'Document Colors',
    type: 'document',
    icon: DropIcon,
    fields: [
      {
        name: 'title',
        title: 'Title of Color',
        type: 'string'
      },
      {
        name: 'color',
        title: 'Color',
        type: 'color',
    },

    ],
    preview: {
        select: {
            title: `title`,
        },
        prepare(selection) {
            return { ...selection }
        },
    },
  })