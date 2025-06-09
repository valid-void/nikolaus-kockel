import { defineField } from 'sanity'

export default defineField({
    name: 'taxonomy',
    title: 'Taxonomy',
    type: 'object',
    fields: [
        {
            title: 'Year',
            name: 'year',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                {
                    title: "Select a category",
                    name: "category",
                    type: "reference",
                    weak: true,
                    to: [{ type: "category" }],
                    // options: {
                    //     enableNew: true
                    // }
                }
            ]
        },
        // {
        //     name: 'team',
        //     title: 'Team',
        //     type: 'array',
        //     of: [
        //         {
        //             title: "Select a team member",
        //             name: "team",
        //             type: "reference",
        //             weak: true,
        //             to: [{ type: "team" }],
        //             // options: {
        //             //     disableNew: false
        //             // }
        //         }
        //     ]
        // },
    ],
    preview: {
        select: {
            title: 'title',
        },
        // prepare(selection) {
        //   return {...selection}
        // },
    },
})