import BurgerMenu from "./burgerMenu"
import Logo from "./Logo";

interface PageTitleProps {
    title: string | null;
    category: any;
    year: string | null;
}

export default function PageTitle (props: PageTitleProps) {
    return (
      <div className="fixed md:top-2 right-0 md:right-auto left-0 z-30 ">

        { props.title ? 
          <>
            <h1 className="bg-primary/30 backdrop-blur md:inline-block text-3xl/[1] md:text-5xl/[1.6] md:rounded-r-[50px] p-2  md:p-0 md:px-4 shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
                {props.title}
            </h1>
            <br className="hidden md:block"/> 
          </>
        : "" }

        { props.year ? 
          <div className="inline-block bg-primary/30 backdrop-blur w-auto md:w-auto m-0 p-0 rounded-r-[50px] px-2 md:px-4 my-2  shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
            {props.year}
          </div>
        : "" }

        <div className="bg-primary/30 backdrop-blur hidden md:inline-block w-auto md:w-auto m-0 p-0 bg-almostWhite rounded-[50px] px-2 m-2 shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
          {props?.category?.map((tag: any, i: number) => (
            <span key={`tag-${i}`} className="tagButton px-2">
              {tag?.title}
            </span>
          ))}
        </div>
        
      </div>
    )
}
