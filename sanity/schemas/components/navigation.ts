import { defineField } from 'sanity'

export default defineField({
    name: 'navigation',
    title: 'Navigation',
    type: 'object',
    fields: [
        {
            name: 'menu',
            title: 'Main Menu',
            type: 'array',
            of: [
                {
                    title: "Select a Page",
                    name: "page",
                    type: "reference",
                    weak: true,
                    to: [
                        { type: "post" }, 
                        { type: "project" }, 
                        // { type: "contact" }
                    ],
                    options: {
                        disableNew: true
                    }
                }
            ]
        },
    ],
    preview: {
        prepare() {
            const title = "Menu"
            return { title };
        },
    },
})