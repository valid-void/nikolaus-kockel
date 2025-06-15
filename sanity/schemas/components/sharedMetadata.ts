import { defineField } from 'sanity'

export const sharedDocumentGroups = [
  {
    title: 'Media',
    name: 'media',
    default: true
  },
  {
    title: 'Description',
    name: 'title'
  },
  {
    title: 'Content',
    name: 'content',
  },
  {
    title: 'Metadata',
    name: 'metadata'
  },
  {
    title: 'Colors',
    name: 'colors'
  }
];

export const sharedDocumentFields = [
  defineField({
    title: 'Title',
    name: 'title',
    type: 'internationalizedArrayString',
    group: 'title',
  }),
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    group: 'title',
    description: "A slug is required for URL. Generation is based on the field 'title'.",
    options: {
      source: 'title[0].value',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    title: 'Preview image',
    name: 'previewImage',
    type: 'image',
    group: 'media',
  }),
  defineField({
    name: 'gallery',
    title: 'Gallery Images',
    type: 'array',
    group: 'media',
    of: [{ type: 'image' }]
  }),
  defineField({
    name: 'category',
    title: 'Category',
    type: 'array',
    group: 'metadata',
    of: [
      {
        title: "Select a category",
        name: "category",
        type: "reference",
        weak: true,
        to: [{ type: "category" }]
      }
    ]
  }),
  defineField({
    name: 'authors',
    title: 'Authors',
    type: 'array',
    of: [{ type: 'string' }],
    description: 'Add you Name. It will improve Google seaches and sozial feeds.',
    group: 'metadata'
  }),
  defineField({
    title: 'Keywords',
    name: 'keywords',
    type: 'internationalizedArrayString',
    group: 'metadata',
  }),
  defineField({
    title: 'Description',
    name: 'description',
    type: 'internationalizedArraySimpleBlock',
    group: 'title',
  }),
  defineField({
    title: 'Content',
    name: 'main',
    type: 'internationalizedArrayDocumentContent',
    group: 'content',
  }),
  defineField({
    name: "colors",
    title: "Colors",
    type: "coloredSection",
    group: 'colors'
  }),
];