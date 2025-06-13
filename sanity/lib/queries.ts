import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);
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
  'colors': colors{ 'bgColor': bgColor->{color}, 'textColor': textColor->{color}},
}`);


export const contentSlugs = defineQuery(
  `*[_type in ["page", "project", "event"] && defined(slug.current)]{"slug": slug.current}`,
);
export const contentQuery = defineQuery(`*[_type in ["page", "project", "event"] && slug.current == $slug] [0] {
    _id,
    'title': title[_key == $locale][0].value, 
    'colors': colors{ 'bgColor': bgColor->{color}, 'textColor': textColor->{color}},
    'main': main[_key == $locale][0].value
  }
`)
export const projectListQuery = defineQuery(`*[_type == "project"] | order(date desc) {
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
  }
`)

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
