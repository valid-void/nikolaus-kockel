import { defineField } from 'sanity'
import { format, parseISO } from "date-fns";
import { sharedDocumentFields, sharedDocumentGroups } from '../components/sharedMetadata';
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import { CubeIcon } from '@sanity/icons';


export default defineField({
    name: 'project',
    title: 'Project',
    type: 'document',
    icon: CubeIcon,
    orderings: [orderRankOrdering],
    groups: sharedDocumentGroups,
    fields: [
        orderRankField({ type: "project",  newItemPosition: "before" }),
        defineField({
            title: 'Year',
            name: 'year',
            type: 'string',
            group: 'metadata',
        }),
        ...sharedDocumentFields,
    ],
    preview: {
        select: {
            title: 'title',
            date: "date",
            media: "previewImage",
            year: 'year',
        },
        prepare({ title, media, date, year }) {
            const startDate = date?.start ? `${format(parseISO(date.start), "dd.MM.yyyy")}` : "Date undefined";
            const subtitles = [year];
            const documentTitle = title?.[0]?.value ?? 'Untitled';
            return { title: documentTitle, media, subtitle: subtitles.join(" ") };
        },
    },
})