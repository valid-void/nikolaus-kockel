import { defineField } from 'sanity'
import { TiersIcon } from '@sanity/icons'

export default defineField({
    name: 'eventList',
    title: 'Event List',
    type: 'object',
    icon: TiersIcon,
    fields: [
        {
            title: 'Event Category',
            name: 'eventCategory',
            type: 'string',
            options: {
              list: [
                {title: "On Going Events", value: "present"},
                {title: "Up Coming Events", value: "future"},
                {title: "Past Events", value: "past"}
              ],
            },
            validation: (rule) => rule.required(),
        },
        {
            title: "Colors",
            name: "colors",
            type: "coloredSection",
                  options: {
        collapsed: true
      }
        },
    ],
    preview: {
        select: {
            title: `eventCategory`,
        },
        prepare(selection) {
            const title = selection.title + " events"
            return { ...selection, title: title, subtitle: 'List of Events' }
        },
    },
})


