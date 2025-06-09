import { defineField } from 'sanity'
import { format, parseISO } from "date-fns";
import { sharedDocumentFields, sharedDocumentGroups } from '../components/sharedMetadata';


export default defineField({
    name: 'page',
    title: 'Page',
    type: 'document',
    groups: sharedDocumentGroups,
    fields: [
        ...sharedDocumentFields,
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