import { sanityFetch } from "@/sanity/lib/fetch";
import { eventInFuture, eventInPast, eventOnGoing } from "@/sanity/lib/queries";
import Link from "next/link";
import PreviewImage from "./previewImage";

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
        <div style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties}>
            {
                eventCategory === 'present' ? <Events events={data} eventCategory={eventCategory}/> :
                eventCategory === 'future' ? <Events events={data} eventCategory={eventCategory}/> :
                eventCategory === 'past' ? <PastEvents events={data} /> : null
            }
        </div>
    )
}



const Events = (props: any) => {
    const eventCategory = props.eventCategory;
  return (
    <div>
      {props.events?.map((event: any, index: number) => {
        let [startYear, startMonth, startDay] = event.start.split('-')
        let [endYear, endMonth, endDay] = event.end.split('-')
        return (
          <div key={index}>
            <div className="p-10 py-20 md:py-[7rem] grid md:grid-cols-2">
              <div className='md:order-last m-4'>
                {event?.previewImage == undefined ? "" :
                <Link href={event.slug}>
                    <PreviewImage image={event.previewImage}  />
                </Link>
                }
              </div>
              <div className="m">
                <div className='mb-2'>
                  <Link href={event.slug}>
                    <h3 className='p-0'>{event.title}</h3>
                    <div className='px-0 text-lg'>
                      {eventCategory === "present" ? <div className='w-4 h-4 rounded-full bg-green animate-pulse absolute translate-y-1 -translate-x-6'></div> : ""}
                      {startDay}.{startMonth}. - {endDay}.{endMonth}.{endYear}
                      {/* <p className='p-0 m-0  text-sm'>{data.eventCategory === "present" ? "on going show" : "up coming show"}</p> */}
                    </div>
                    {/* <h6 className='p-0'>{event.venue ? "" + event.venue : ""}{event.city ? ", " + event.city : ""}</h6> */}
                  </Link>
                </div>
                <Link href={event.slug}>
                    ⇢ <div className="underline float-right text-sm">read more</div>
                </Link>
              </div>
            </div>
            <hr className='color-primaryTextColor' />
          </div>
        )
      })}
    </div>
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