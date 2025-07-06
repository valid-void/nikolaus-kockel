import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function PreviewImage(props: any) {
  const { image: source, priority } = props;
  return source?.asset?._ref ? (
    <Image
    //   className="h-auto w-full"
      className="w-full sm:rounded-xl mb-2"
      width={2000}
      height={1000}
      alt={source?.alt || ""}
      src={urlForImage(source)?.url() as string}
    //   src={urlForImage(source)?.height(1000).width(2000).url() as string}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }} />
  );
}

export function CovorImage(props: any) {
  const { image: source, priority } = props;
  return source?.asset?._ref ? (
    <div className=''>
      <Image
        className="sm:rounded-xl sm:h-screen w-full object-cover"
        width={2000}
        height={1000}
        alt={source?.alt || ""}
        src={urlForImage(source)?.url() as string}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }} />
  );
}
