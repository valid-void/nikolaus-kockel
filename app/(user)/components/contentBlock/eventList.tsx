import { sanityFetch } from "@/sanity/lib/fetch";
import { eventInFuture, eventInPast, eventOnGoing } from "@/sanity/lib/queries";
import Link from "next/link";
import PreviewImage from "./previewImage";
// import { PortableText } from "next-sanity";
import PortableText from "../../components/portable-text";
import { PortableTextBlock } from "next-sanity";
import { ArrowRightCircleIcon, CalendarIcon} from "@heroicons/react/24/solid"



const getColors = (colors: any) => {
    return [
        colors?.bgColor?.color?.hex ?? null, 
        colors?.textColor?.color?.hex ?? null
    ]
}

export default async function EventList(props: any) {
    // console.log("project list props", props)
    const params = props.params;

    const eventCategory = props.eventCategory;
    let eventQuery;
    switch (eventCategory) {
        case "present":
            eventQuery = eventOnGoing;
            break;
        case "future":
            eventQuery = eventInFuture;
            break;
        case "past":
            eventQuery = eventInPast;
            break;
    }
    const [data] = eventQuery ? await Promise.all([
        sanityFetch({ query: eventQuery, params })
    ]) : [];

    console.log("EVENT DATA", data)



    const [bgColor, textColor] = getColors(props.colors);
    return (
        <div style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties} className="pt-10 sm:mb-0">
            {
                eventCategory === 'present' || 
                eventCategory === 'future' ? <Events events={data} eventCategory={eventCategory} params={params} /> :
                eventCategory === 'past' ? <PastEvents events={data} /> : null
            }
        </div>
    )
}



const Events = (props: any) => {
  const eventCategory = props.eventCategory;
  return (
    <>
      {props.events?.map((event: any, index: number) => {
        let [startYear, startMonth, startDay] = event.start.split('-')
        let [endYear, endMonth, endDay] = event.end.split('-')
        const eventDates = startDay + "." + startMonth + ". - " + endDay + "." + endMonth + "." + endYear
        return (
            <div key={index} className="sm:p-10 pb-20 md:py-[7rem] grid md:grid-cols-2">
              <div className='md:order-last'>
                {event?.previewImage == undefined ? "" :
                <Link href={event.slug}>
                    <PreviewImage image={event.previewImage}  />
                </Link>
                }
              </div>
              <div className="m">
                <div className='mb-2 border-b border-b-primaryTextColor '>
                <h3 className='py-0 px-4'>
                      <Link href={event.slug}>
                        {event.title}
                      </Link>
                    </h3>

                    <div className='flex justify-end px-4 text-lg align-middle border-b border-b-primaryTextColor'>
                      {/* <p className='p-0 m-0  text-sm'>{eventCategory === "present" ? "on going show" : "up coming show"}</p> */}
                      <span className='w-4 h-4 my-auto mr-2'>
                        { eventCategory === "present" ? 
                          <div className='rounded-full w-full h-full bg-green animate-pulse'></div> :
                          <CalendarIcon />
                        }
                      </span>
                        { eventDates}
                    </div>

                    
                    {/* <h6 className='p-0'>{event.venue ? "" + event.venue : ""}{event.city ? ", " + event.city : ""}</h6> */}
                    <div className="p-4">

                      { event.description ? 
                        <PortableText
                          value={event.description as PortableTextBlock[]}
                          params={props.params}
                        />
                      : "" }
                    </div>
                  
                </div>
                <Link href={event.slug}>
                  <div className="underline float-right text-sm flex px-4">
                    {event.title} <ArrowRightCircleIcon className="h-5 w-5 ml-4" />
                  </div>
                </Link>
              </div>
            </div>
        )
      })}
    </>
  )
}


const PastEvents = (props: any) => {
//   const listTitle = lang === "de" ? "Events" : "Events";
  return (
    <div className='contentContainer module grid  md:grid-cols-2 grid-cols-1 p-10 '>
      {/* <h2 className=' col-start-1 col-span-2'>{listTitle}</h2> */}
      <div className=' col-start-1 md:col-start-2 mx-4'>
        {props.events?.map((event: any, index: number) => {
          let [startYear, startMonth, startDay] = event.start.split('-')
          // let [endYear, endMonth, endDay] = post.end.split('-')
          return (
            <div key={index} className='flex gap-4 mb-10'>
              <div className='w-20 text-left'>{startYear}</div>
              <div className='w-full'>
                <Link href={event.slug}>
                  <div>{event.venue}{event.city ? ", " + event.city : ""}</div>
                  <div><i>{event.title}</i></div>
                  <div>
                    ⇢ <div className="underline float-right text-sm">read more</div>
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}