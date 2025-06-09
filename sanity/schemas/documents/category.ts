import { defineField } from 'sanity'
import {TagIcon} from '@sanity/icons'


export default defineField({
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: TagIcon,
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',

    },
    //   {
    //     name: 'description',
    //     title: 'Description',
    //     type: 'text'
    //   }
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