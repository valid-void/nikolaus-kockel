import PreviewImage from "./previewImage";

export default async function StyledImage(props: any) {

    const { imagePosition, image } = props;
    const layoutClass =
    imagePosition === "left"
      ? "float-left mr-6 w-1/2"
      : imagePosition === "right"
      ? "float-right ml-6 w-1/2"
      : "w-full";

return (
        <div className={`max-w-5xl mx-auto py-4 ${layoutClass}`}>
            {/* {JSON.stringify(props)} */}
            <PreviewImage image={image}  />
        </div>
    )
}