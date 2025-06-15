"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { colorInput } from '@sanity/color-input'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";
import { StructureBuilder, structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { singletonPlugin } from "@/sanity/plugins/settings";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import project from "@/sanity/schemas/documents/project";
import { resolveLocations } from "@/sanity/lib/utils";

// import modules from "./sanity/schemas/modules";
import styledImage from "./sanity/schemas/components/styledImage";
import coloredSection from "./sanity/schemas/components/coloredSection";
import eventList from "./sanity/schemas/components/eventList";
import colorTag from "./sanity/schemas/documents/colorTag";
import { documentContent, insertGallery, simpleBlock } from "./sanity/schemas/components/localisedFields";
import taxonomy from "./sanity/schemas/components/taxonomy";
import category from "./sanity/schemas/documents/category";
import eventDates from "./sanity/schemas/components/eventDates";
import event from "./sanity/schemas/documents/event";
import { AddUserIcon, CalendarIcon, CogIcon, DocumentIcon, DocumentsIcon, DropIcon, TagIcon, CubeIcon, HashIcon, DocumentTextIcon } from "@sanity/icons";
import { ComponentType } from "react";
import websiteInfo from "./sanity/schemas/singletons/websiteInfo";
import navigation from "./sanity/schemas/components/navigation";
import projectList from "./sanity/schemas/components/projectList";
import page from "./sanity/schemas/documents/page";
import { languages } from "./i18n";
import { client } from "./sanity/lib/client";

export const defaultLanguage = "de";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

const CustomDocumentLocation = defineLocations({
  select: {
    localeTitle: "title",
    slug: "slug.current",
  },
  resolve: (doc) => ({ locations: resolveLocations(doc) })
})

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      websiteInfo,
      // Documents
      page,
      project,
      event,
      post,
      author,
      colorTag,
      category,
      // Modules
      navigation,
      simpleBlock,
      documentContent,
      styledImage,
      coloredSection,
      projectList,
      eventList,
      eventDates,
      taxonomy,
      insertGallery,
    ],
  },
  document: {
    actions: (prev, context) => {
      if (
        context.schemaType === 'websiteInfo' ||
        context.documentId === 'privacy' ||
        context.documentId === 'imprint'
      ) {
        return prev.filter((action) => action.action !== 'delete')
      }
      return prev
    }
  },
  plugins: [
    colorInput(),
    internationalizedArray({
      languages: languages.map((language: any) => ({
        id: language.slug,
        title: language.title,
      })),
      defaultLanguages: [languages.filter((language: any) => language.isDefault)[0].slug],
      fieldTypes: ['string', 'text', 'documentContent', 'simpleBlock']
    }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/",
            filter: `_type == "websiteInfo"`,
          },
          // {
          //   route: "/:slug",
          //   filter: `_type == "project" && slug.current == $slug || _type == "event" && slug.current == $slug || _type == "post" && slug.current == $slug`,
          // },
        ]),
        locations: {
          websiteInfo: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          project: CustomDocumentLocation,
          event: CustomDocumentLocation,
          page: CustomDocumentLocation,
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    structureTool({
      // structure:  pageStructure([settings]) 
      structure: async (S, context) => S.list()
        .title('Content')
        .items([
          Projects(S, context),
          Events(S),
          await Pages(S),
          // Posts(S),
          S.divider(),
          Taxonomy(S),
          S.divider(),
          Settings(S),
        ])

    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([
      websiteInfo.name,
      colorTag.name,
      category.name,
      taxonomy.name,
      author.name,
      post.name,
    ]),
    // Add an image asset source for Unsplash
    // unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    // assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
    visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});

const Settings = (S: StructureBuilder) =>
  S.listItem()
    .title('General')
    .icon(CogIcon as ComponentType)
    .child(S.document().schemaType('websiteInfo').documentId('websiteInfo'))

const Events = (S: StructureBuilder) =>
  S.listItem()
    .title('Events')
    .icon(CalendarIcon as ComponentType)
    .child(
      S.documentTypeList('event')
    )

const Projects = (S: StructureBuilder, context: any) =>
  orderableDocumentListDeskItem({
    type: 'project',
    title: 'Projects',
    icon: CubeIcon,
    S, context
  })

const Posts = (S: StructureBuilder) =>
  S.listItem()
    .title('Posts')
    .icon(DocumentIcon as ComponentType)
    .child(
      S.documentTypeList('post')
    )

const Taxonomy = (S: StructureBuilder) =>
  S.listItem()
    .title('Taxonomy')
    .icon(TagIcon as ComponentType)
    .child(
      S.list()
        .title('Taxonomy')
        .items([
          S.listItem()
            .title('Category')
            .icon(HashIcon as ComponentType)
            .child(
              S.documentTypeList('category')
            ),
          S.listItem()
            .title('Author')
            .icon(AddUserIcon as ComponentType)
            .child(
              S.documentTypeList('author')
            ),
          S.listItem()
            .title('Color')
            .icon(DropIcon as ComponentType)
            .child(
              S.documentTypeList('colorTag')
            )
        ])
    )

const Pages = async (S: StructureBuilder) => {
  const pages = await client.fetch(
    `*[_type == "page" && _id != "imprint" && _id != "privacy"]{
      _id, 'title': title[_key == 'de'][0].value, 
    }`
  )
  return S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Pages')
        .items([
          ...pages.map((page: any) =>
            S.listItem()
              .title(page?.title || '[Untitled Page]')
              .icon(DocumentIcon)
              .id(page._id)
              .child(
                S.document()
                  .schemaType('page')
                  .documentId(page._id)
              )
          ),
          S.divider(),
          S.listItem()
            .title('Imprint')
            .icon(DocumentTextIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('imprint')
            ),
          S.listItem()
            .title('Privacy')
            .icon(DocumentTextIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('privacy')
            ),
        ])
    )
}