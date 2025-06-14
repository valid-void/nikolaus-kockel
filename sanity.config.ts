"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { internationalizedArray } from 'sanity-plugin-internationalized-array';
import { colorInput } from '@sanity/color-input'
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";
import { StructureBuilder, structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import project from "@/sanity/schemas/documents/project";
import { resolveHref } from "@/sanity/lib/utils";

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
import { AddUserIcon, CalendarIcon, CogIcon, DocumentIcon, DropIcon, MenuIcon, TagIcon } from "@sanity/icons";
import { ComponentType } from "react";
import websiteInfo from "./sanity/schemas/singletons/websiteInfo";
import navigation from "./sanity/schemas/components/navigation";
import projectList from "./sanity/schemas/components/projectList";
import page from "./sanity/schemas/documents/page";

export const languages = [
  { id: 'de', title: 'Deutsch' },
  { id: 'en', title: 'English' }
];

export const defaultLanguage = "de";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

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
      if (context.schemaType === 'websiteInfo') {
        return prev.filter((action) => action.action !== 'delete')
      }
      return prev
    }
  },
  plugins: [
    colorInput(),
    internationalizedArray({
      languages: languages,
      defaultLanguages: ['de'],
      fieldTypes: ['string', 'text', 'documentContent', 'simpleBlock']
    }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          websiteInfo: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title[_key == 'de'][0].value",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title[0].value || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    structureTool({
      // structure:  pageStructure([settings]) 
      structure: (S) => S.list()
        .title('Content')
        .items([
          Projects(S),
          Events(S),
          // Posts(S),
          Pages(S),
          S.divider(),
          Taxonomy(S),
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
          
const Pages = (S: StructureBuilder) =>
  S.listItem()
    .title('Pages')
    .icon(DocumentIcon as ComponentType)
    .child(
      S.documentTypeList('page')
    )

const Events = (S: StructureBuilder) =>
  S.listItem()
    .title('Events')
    .icon(CalendarIcon as ComponentType)
    .child(
      S.documentTypeList('event')
    )

const Projects = (S: StructureBuilder) =>
  S.listItem()
    .title('Projects')
    .icon(DocumentIcon as ComponentType)
    .child(
      S.documentTypeList('project')
    )

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
    .icon(CalendarIcon as ComponentType)
    .child(
      S.list()
        .title('Taxonomy')
        .items([
          S.listItem()
    .title('Category')
    .icon(TagIcon as ComponentType)
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