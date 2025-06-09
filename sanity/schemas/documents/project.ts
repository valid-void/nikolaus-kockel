import { defineField } from 'sanity'
import { format, parseISO } from "date-fns";
import { sharedDocumentFields, sharedDocumentGroups } from '../components/sharedMetadata';


export default defineField({
    name: 'project',
    title: 'Project',
    type: 'document',
    orderings: [
        {
            title: 'Release Date, New',
            name: 'releaseDateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ],
    groups: sharedDocumentGroups,
    fields: [
        defineField({
            title: 'Year',
            name: 'year',
            type: 'string',
            group: 'metadata',
        }),
        ...sharedDocumentFields,
        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            group: 'media',
            description: "This field defines the order of the projects.",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: "date",
            media: "previewImage",
        },
        prepare({ title, media, date }) {
            const startDate = date?.start ? `${format(parseISO(date.start), "dd.MM.yyyy")}` : "Date undefined";
            const subtitles = [startDate].filter(Boolean);
            const documentTitle = title?.[0]?.value ?? 'Untitled';
            return { title: documentTitle, media, subtitle: subtitles.join(" ") };
        },
    },
})