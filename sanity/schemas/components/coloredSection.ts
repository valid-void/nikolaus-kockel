import { defineField } from 'sanity'


export default defineField({
  name: 'coloredSection',
  title: 'Colored Section',
  type: 'object',
  options: {
    columns: 2,
    collapsed: false,
},
  fields: [
    {
      title: "Background Color",
      name: "bgColor",
      type: "reference",
      to: [{ type: "colorTag" }],
      options: {
        // disableNew: true
      }
    },
    {
      title: "Text Color",
      name: "textColor",
      type: "reference",
      to: [{ type: "colorTag" }],
      options: {
        // disableNew: true
      }
    },
]
})