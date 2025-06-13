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
        type: 'internationalizedArrayString'
      },
    //   {
    //     title: 'Slug',
    //     name: 'slug',
    //     type: 'slug',
    // },
      defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    description: "A slug is required for URL. Generation is based on the field 'title'.",
    options: {
      source: 'title[0].value',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (rule) => rule.required(),
  }),
    //   {
    //     name: 'description',
    //     title: 'Description',
    //     type: 'text'
    //   }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            const documentTitle = title?.[0]?.value ?? 'Untitled';
            return { title: documentTitle };
        },
    },
  })