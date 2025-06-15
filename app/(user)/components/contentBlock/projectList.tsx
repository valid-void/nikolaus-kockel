import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";

import { sanityFetch } from "@/sanity/lib/fetch";
import { projectListQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import PreviewImage from "./previewImage";


interface ProjectListProps { 
    _key: string;
    _type: string; 
    showAllProjects: boolean;
    params: { slug: string }
}

export default async function ProjectList(props: any) {
    const params = props.params;

    const [projects] = await Promise.all([
      sanityFetch({ query: projectListQuery, params })
    ]);

    return (
        <div className="w-full sm:p-10 sm:pt-40">
            {/* <p>{JSON.stringify(projects)}</p> */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-10 space-y-4">
                { projects.map((project: any, index: number) => {
                    return (
                        <div key={index} className="break-inside-avoid pb-20">
                                <div className="transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
                                <Link href={project?.slug ?? "/"}>
                                    <PreviewImage image={project.previewImage}  />
                                    </Link>
                                </div>
                                <div className="pt-2 px-4 bottom-0 left-0 right-0">
                                    <div className="text-sm">{project.year}</div>
                                    
                                    <h3 className="px-0 py-0 m-0 text-lg font-semibold">
                                        <Link href={project?.slug ?? "/"}>
                                            {project.title}
                                        </Link>
                                    </h3>

                                    <div className="text-sm" style={{overflowWrap: 'anywhere'}} >
                                        {project.category?.map((category: any, i: number) => (
                                            <span key={`category-${category.slug || i}`} className="text-nowrap mr-4">
                                                {category?.title}
                                            </span>
                                        ))}
                                    </div>
                                    {/* <div className="px-4">
                                        <div className="underline float-right text-sm">⇢ read more</div>
                                    </div> */}
                                </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
