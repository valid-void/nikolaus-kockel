import { defineField } from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineField({
  name: 'styledImage',
  title: 'Image',
  icon: ImageIcon,
  type: 'object',
  fields: [
    {
      name: 'imagePosition',
      title: 'Position of Image',
      type: "string",
      initialValue: "full", 
      options: {
        list: [
          {
            title: 'Left',
            value: 'left'
          },
          {
            title: 'Full',
            value: 'full'
          },
          {
            title: 'Right',
            value: 'right'
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
      }
    },
  ],
  preview: {
    select: {
      media: "image",
      imagePosition: "imagePosition"
    },
    prepare(selection) {
      const title = "Image (position: " + selection.imagePosition + ")";
      return { title, ...selection }
    },
  },
})