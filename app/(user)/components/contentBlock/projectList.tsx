import { sanityFetch } from "@/sanity/lib/fetch";
import { projectListQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import PreviewImage from "./previewImage";


export default async function ProjectList(props: any) {
    const params = props.params;

    const [originalProjects] = await Promise.all([
        sanityFetch({ query: projectListQuery, params })
    ]);

    function reorderColumns(arr: Array<any>, numColumns: number) {
        const result = [];
        for (let col = 0; col < numColumns; col++) {
            for (let i = col; i < arr.length; i += numColumns) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    const reorderProjects = reorderColumns(originalProjects, 3);


    return (
        <div className="w-full pt-10 sm:p-10 sm:pt-20">
            <div className="hidden sm:block columns-3 gap-10 space-y-4">
                { mapProjects(reorderProjects) }
            </div>
            <div className="sm:hidden columns-1 gap-10 space-y-4">
                { mapProjects(originalProjects) }
            </div>
        </div>
    )
}


const mapProjects = (projects: Array<any>) => {
    return projects.map((project: any, index: number) => {
        return (
            <div key={index} className="break-inside-avoid pb-20">
                <div className="transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
                    <Link href={project?.slug ?? "/"}>
                        <PreviewImage image={project.previewImage} />
                    </Link>
                </div>
                <div className="pt-2 px-4 bottom-0 left-0 right-0">

                    <div className="text-sm">
                        {project.year}
                    </div>

                    <h3 className="px-0 py-0 m-0 ">
                        <Link href={project?.slug ?? "/"} className="no-underline">
                            {project.title}
                        </Link>
                    </h3>

                    <div className="text-sm" style={{ overflowWrap: 'anywhere' }} >
                        {project.category?.map((category: any, i: number) => (
                            <span key={`category-${category?.slug || i}`} className="text-nowrap mr-4">
                                {category?.title}
                            </span>
                        ))}
                    </div>

                </div>
            </div>
        )
    })
}