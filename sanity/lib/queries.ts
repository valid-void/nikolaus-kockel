import { defineQuery } from "next-sanity";

const colors = /* groq */ `'colors': colors{ 'bgColor': bgColor->{color}, 'textColor': textColor->{color}}`;
export const websiteInfoQuery = defineQuery(`*[_type == "websiteInfo"][0] {
  ...,
  footer[]{
    _type == "link" => {
      "title": title,
      "link": url
    },
    _type == "page" => {
      "title": @->title[_key == $locale][0].value,
      "link": @->slug.current
    }
  },
  menu[]->{
    'title': title[_key == $locale][0].value, 
    'slug': slug.current 
  },
  homepage->{
    'title': title[_key == $locale][0].value, 
    'slug': slug.current 
  },
  'description': meta[_key == $locale][0].value, 
  ${colors},
}`);

export const homepageQuery = defineQuery(`*[_type == "websiteInfo"][0] {
  'slug': homepage->slug.current,
  'title': homepage->title[_key == $locale][0].value,
  author,
}`)


export const contentSlugs = defineQuery(
  `*[_type in ["page", "project", "event", "category"] && defined(slug.current)]{"slug": slug.current}`,
);
export const contentQuery = defineQuery(`*[_type in ["page", "project", "event"] && slug.current == $slug] [0] {
    _id,
    previewImage,
    'title': title[_key == $locale][0].value, 
    'description': description[_key == $locale][0].value, 
    ${colors},
    'main': main[_key == $locale][0].value[]{
      ...,
      ${colors},
    }
  }
`)

const previewFieldsOfMainDocuments = /* groq */ `
    'title': title[_key == $locale][0].value, 
    'description': description[_key == $locale][0].value, 
    category[]->{
      'title': title[_key == $locale][0].value, 
      'slug': slug.current 
    },
    'keywords': keywords[_key == $locale][0].value, 
    previewImage,
    'slug': slug.current,
    year
`
export const projectListQuery = defineQuery(`*[_type == "project"] | order(date desc) {
  ${previewFieldsOfMainDocuments},
}`)
export const additionEventFields = /* groq */ `
  'start': date.start,
  'end': date.end,
`
export const eventOnGoing= defineQuery(`*[_type=='event' && date.start < now() && date.end > now()] {
  ${previewFieldsOfMainDocuments},
  ${additionEventFields}
}`)
export const eventInFuture = defineQuery(`*[_type=='event' && date.start > now()] {
  ${previewFieldsOfMainDocuments},
  ${additionEventFields}
}`)
export const eventInPast = defineQuery(`*[_type=='event' && date.end < now()] {
  ${previewFieldsOfMainDocuments},
  ${additionEventFields}
}`)
export const galleryQuery = defineQuery(`*[_type in ["page", "project", "event"] && slug.current == $slug] [0] {
  gallery
}`)



const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
   "title": coalesce(title[_key == "de"][0].value, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);
