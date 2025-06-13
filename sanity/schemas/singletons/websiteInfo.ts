import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export default defineType({
    name: 'websiteInfo',
    title: 'Website Info',
    type: 'document',
    icon: CogIcon,
    groups: [
        {
            title: 'Title',
            name: 'title',
            default: true
        },
        {
            title: 'Navigation',
            name: 'menu',
        },
        {
            title: 'Homepage',
            name: 'homepage',
        },
        {
            title: 'Colors',
            name: 'colors',
        },
        {
            title: 'Metadata',
            name: 'metadata'
        },
        {
            title: 'Image',
            name: 'image'
        }
    ],
    fields: [
        defineField({
            name: "title",
            description: "This field is the title of your blog.",
            title: "Title",
            type: "string",
            group: "title",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "colors",
            title: "Colors",
            type: "coloredSection",
            group: 'colors',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: "Homepage",
            name: "homepage",
            type: "reference",
            group: 'menu',
            weak: true,
            to: [
                { type: "page" }
            ],
            options: {
                disableNew: true
            }
        }),
        defineField({
            name: 'menu',
            title: 'Main Menu',
            type: 'array',
            group: 'menu',
            of: [
                {
                    title: "Select a Page",
                    name: "page",
                    type: "reference",
                    weak: true,
                    to: [
                        { type: "page" }
                    ],
                    options: {
                        disableNew: true
                    }
                }
            ]
        }),
        defineField({
            name: 'footer',
            title: 'Footer Links',
            type: 'array',
            group: 'menu',
            of: [
                defineField({
                    name: 'link',
                    title: 'Link',
                    type: 'object',
                    fields: [
                        {
                            title: "Title",
                            name: "title",
                            type: "string",
                        },
                        {
                            title: "URL",
                            name: "url",
                            type: "string",
                        }
                    ]
                }),
                {
                    title: "Select a Page",
                    name: "page",
                    type: "reference",
                    weak: true,
                    to: [
                        { type: "page" }
                    ],
                    options: {
                        disableNew: true
                    }
                }
            ]
        }),



        defineField({
            title: "Background Color",
            name: "bgColor",
            type: "reference",
            to: [
                { type: "page" },
                { type: "project" },
                { type: "event" },
            ],
            group: 'homepage',
            options: {
                disableNew: true
            }
        }),
        defineField({
            title: 'Metadata',
            name: 'meta',
            group: "metadata",
            type: 'internationalizedArraySimpleBlock',
        }),
        defineField({
            name: "ogImage",
            title: "Open Graph Image",
            type: "image",
            group: "image",
            description: "Displayed on social cards and search engine results.",
            options: {
                hotspot: true,
                aiAssist: {
                    imageDescriptionField: "alt",
                },
            },
            fields: [
                defineField({
                    name: "alt",
                    description: "Important for accessibility and SEO.",
                    title: "Alternative text",
                    type: "internationalizedArrayString",
                    validation: (rule) => {
                        return rule.custom((alt, context) => {
                            if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                                return "Required";
                            }
                            return true;
                        });
                    },
                }),
                defineField({
                    name: "metadataBase",
                    type: "url",
                    //   description: (<a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase" rel="noreferrer noopener">More information</a>),
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Settings",
            };
        },
    },
});
