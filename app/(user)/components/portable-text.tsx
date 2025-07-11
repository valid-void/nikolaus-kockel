import {
  PortableText,
  type PortableTextBlock,
} from "next-sanity"

import InsertGallery from "./contentBlock/insertGallery"
import EventList from "./contentBlock/eventList"
import ProjectList from "./contentBlock/projectList"
import StyledImage from "./contentBlock/styledImage"

export default function CustomPortableText({
  value,
  params,
}: {
  value: PortableTextBlock[]
  params: Promise<{ slug: string }> | { slug: string }
}) {
  // Split content: separate standard blocks and custom types
  return (
    <div>
      {value.map((block, index) => {
        // Check for custom object types
        if (block._type === "eventList") return <EventList key={block._key ?? index} {...block} params={params} />
        if (block._type === "projectList") return <ProjectList key={block._key ?? index} {...block} params={params}   />
        if (block._type === "insertGallery") return <InsertGallery key={block._key ?? index} {...block} params={params} />
        if (block._type === "styledImage") return <StyledImage key={block._key ?? index} {...block} params={params} />
        // Default rich text blocks (headings, paragraphs, etc.)
        return (
          <div key={block._key ?? index} className="max-w-5xl mx-auto px-2">
            <PortableText
              value={[block]} // render one block at a time
              components={{
                block: {
                  h5: ({ children }) => (
                    <h5 className="mb-2 text-sm font-semibold">{children}</h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="mb-1 text-xs font-semibold">{children}</h6>
                  ),
                },
                marks: {
                  link: ({ children, value }) => (
                    <a href={value?.href} rel="noreferrer noopener">
                      {children}
                    </a>
                  ),
                },
                // types: {
                //   styledImage: ({ value }) => <StyledImage {...value} params={params} />,
                // },
                
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
