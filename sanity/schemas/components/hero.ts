import { defineField } from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineField({
  name: 'hero',
  title: 'Cover Image',
  icon: ImageIcon,
  type: 'object',
  fields: [
    {
      title: 'TITLE',
      name: 'title',
      type: 'string',
      initialValue: 'Cover Image',
      // hidden: true
    },
    { name: 'showTitle', title: 'Show TITLE on your website', type: 'boolean', initialValue: 'false' },
    { name: 'alt', title: 'IMAGE DESCRIPTION', type: 'string' },
    { name: 'showAlt', title: 'Show IMAGE DESCRIPTION on your website', type: 'boolean', initialValue: 'false' },
    // {name: 'attribution', title: 'Attribution', type: 'string'}
    {
      name: 'heroHeight',
      title: 'Height of this image section',
      type: "string",
      // of: [{ type: "string" }],
      options: {
        list: [
          {
            title: '100% / full height',
            value: '100vh'
          },
          {
            title: '50% / half height',
            value: '50vh'
          }
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true
      },
      // fields: [
      //   {name: 'title', title: 'Title', type: 'string'},
      //   {name: 'alt', title: 'Alt Description', type: 'string'},
      //   {name: 'attribution', title: 'Attribution', type: 'string'}
      // ]
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})