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
                            <Link href={project?.slug ?? "/"}>
                                <div className="transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
                                    <PreviewImage image={project.previewImage}  />
                                </div>
                                <div className="pt-2 px-4 bottom-0 left-0 right-0">
                                    <div className="text-sm">{project.year}</div>
                                    <h3 className="px-0 py-0 m-0 text-lg font-semibold">{project.title}</h3>
                                    {project.category?.map((category: any, i: number) => (
                                        <span key={`category-${category.slug || i}`} className="tagButton mr-4">
                                            {category?.title}
                                        </span>
                                    ))}
                                    <div className="px-4">
                                        ⇢ <div className="underline float-right text-sm">read more</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
