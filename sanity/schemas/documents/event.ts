import { defineField } from 'sanity'
import { format, parseISO } from "date-fns";
import { sharedDocumentFields, sharedDocumentGroups } from '../components/sharedMetadata';
import { CalendarIcon } from '@sanity/icons';


export default defineField({
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: CalendarIcon,
    orderings: [
        {
          title: 'Start Date, New First',
          name: 'startDateDesc',
          by: [
            {field: 'date.start', direction: 'desc'}
          ]
        },
        {
          title: 'Start Date, Old First',
          name: 'startDateAsc',
          by: [
            {field: 'date.start', direction: 'asc'}
          ]
        },

      ],
    groups: sharedDocumentGroups,
    fields: [
        defineField({
            title: 'Date',
            name: 'date',
            type: 'eventDates',
            group: 'metadata',
        }),
        ...sharedDocumentFields,
    ],
    preview: {
        select: {
            title: 'title',
            date: "date",
            media: "previewImage",
        },
        prepare({ title, media, date }) {
            const startDate = date?.start ? `${format(parseISO(date.start), "dd.MM.yyyy")}` : "Start date undefined";
            const subtitles = [startDate].filter(Boolean);
            const documentTitle = title?.[0]?.value ?? 'Untitled';
            return { title: documentTitle, media, subtitle: subtitles.join(" ") };
        },
    },
})