import { defineField } from 'sanity'
import { TiersIcon } from '@sanity/icons'

export default defineField({
  name: 'projectList',
  title: 'Project List',
  type: 'object',
  icon: TiersIcon,
  fields: [
    {
      title: 'Include all Categories',
      type: 'boolean',
      name: 'showAllProjects',
      initialValue: true
    },
    {
      title: "Select a category",
      name: "category",
      type: "reference",
      hidden: ({ parent }) => parent?.showAllProjects !== false,
      weak: true,
      to: [{ type: "category" }],
      options: {
        disableNew: true
      }
    },
  ],
  preview: {
    select: {
      //   title: `${projectRef.showAllProjects === false }? projectRef.category.title.${defaultLangId} : 'All Projects`,
      category: `category`,
      show: 'showAllProjects'
      // media: 'projectRef.image',
    },
    prepare(selection) {
      const title = selection.show ? "Projects" : "Projects"
      const subtitle = selection.show ? "By all categories" : "By selected category"
      return { title, subtitle }
    },
  },
})


