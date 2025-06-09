import { defineField } from 'sanity'

export default defineField({
    name: 'eventDates',
    title: 'Event Dates',
    type: 'object',
    options: {
        columns: 2,
    },
    fields: [
        {
            name: 'start',
            title: 'Start',
            type: 'date',
            options: {
                dateFormat: 'DD.MM.YYYY',
                calendarTodayLabel: 'Today'
              }
        },
        {
            name: 'end',
            title: 'End',
            type: 'date',
            options: {
                dateFormat: 'DD.MM.YYYY',
                calendarTodayLabel: 'Today'
              }
        },
    ]
})