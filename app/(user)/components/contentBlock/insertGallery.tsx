import { sanityFetch } from "@/sanity/lib/fetch";
import PreviewImage from "./previewImage"
import { galleryQuery } from "@/sanity/lib/queries";

export default async function InsertGallery(props: any) {
    const params = props.params;

    const [data] = await Promise.all([
        sanityFetch({ query: galleryQuery, params })
    ]);
    

return (
        <div className="w-full sm:p-10 sm:pt-40">
            <div className="columns-1 sm:columns-2 md:columns-3 gap-10 space-y-4">
                { data?.gallery?.map((image: any, index: number) => {
                    return (
                        <div key={index} className="break-inside-avoid pb-20">
                            <div className="transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
                                <PreviewImage image={image}  />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}