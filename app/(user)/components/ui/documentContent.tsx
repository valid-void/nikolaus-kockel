import { PortableTextBlock } from "next-sanity";
import PageTitle from "./header/pageTitle";
import { notFound } from "next/navigation";
import PortableText from "../../components/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contentQuery } from "@/sanity/lib/queries";
import PreviewImage from "../contentBlock/previewImage";
import { CalendarIcon } from "@heroicons/react/24/solid";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function DocumentContent({ params }: Props) {
  const [content] = await Promise.all([
    sanityFetch({ query: contentQuery, params })
  ]);

  const bgColor = content?.colors?.bgColor?.color?.hex ?? 'var(--primary-color)';
  const textColor = content?.colors?.textColor?.color?.hex ?? 'var(--primary-text)';

  if (!content?._id) {
    return notFound();
  }

  const docType = content._type; // page, event, project


  return (
    <div>
      <PageTitle title={content.title} category={content.category} year={content.year} />

      <div style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties} className="min-h-screen ">

        { docType === "event" ? <EventHeroSection {...content} params={params} /> : null }
        { docType === "project" ? <ProjectHeroSection {...content} params={params} /> : null }
        
        <Content {...content} params={params} />
        
      </div>
    </div>
  );
}


const Content = async (props: any) => {
  return (
    <div className="pt-10 sm:pt-20">
      {props?.main?.length && (
        <PortableText
          value={props?.main as PortableTextBlock[]}
          params={props?.params}
        />
      )}
    </div>
  )
};

const ProjectHeroSection = async (props: any) => {
  const project = props;
  return (
    <div className='p-10 pb-0'>
      {project?.previewImage == undefined ? "" :
        <PreviewImage image={project.previewImage} />
      }
  </div>
  )
};

const EventHeroSection = (props: any) => {
  const event = props;
  let [startYear, startMonth, startDay] = event.start.split('-')
  let [endYear, endMonth, endDay] = event.end.split('-')
  const eventDates = startDay + "." + startMonth + ". - " + endDay + "." + endMonth + "." + endYear
  return (
    <div className="sm:p-10 pb-2 md:pt-[7rem] grid md:grid-cols-2 border-b border-b-primaryTextColor">

      <div className=''>
        {event?.previewImage == undefined ? "" :
          <PreviewImage image={event.previewImage} />
        }
      </div>
      <div className="m">
        <div className='mb-2 '>
          <h1 className='py-0 px-4'>
            {event.title}
          </h1>
          <div className='flex justify-end px-4 text-lg align-middle border-b border-b-primaryTextColor'>
            <span className='w-4 h-4 my-auto mr-2'>
              <CalendarIcon />
            </span>
            {eventDates}
          </div>
          <div className="p-4">
            {event.description ?
              <PortableText
                value={event.description as PortableTextBlock[]}
                params={event.params}
              />
              : ""}
          </div>
        </div>
      </div>
    </div>
  )
}
