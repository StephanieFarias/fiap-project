import Image from 'next/image';

export interface JumbotronProps {
    image:string;
    title:string;
    description:string;
}

export const Jumbotron = ({image,title,description}:JumbotronProps) =>{
    const imageMobileExt = image.split(".")[1];
    const imageMobile = image.split(".")[0] + "-mobile." + imageMobileExt;
    console.log({imageMobile});
    
    return (
        <section className="w-full relative top-0 h-48 sm:h-80">
            <div className="absolute bottom-0 z-10 px-6 py-2 sm:px-36 sm:py-3">
                <h1 className="text-white font-bold text-base sm:text-3xl ">{title}</h1>
                <h2 className=" text-white mt-1 sm:mt-3 text-sm w-32 sm:w-40 sm:text-base">{description}</h2>
            </div>
            <div className="hidden sm:block">
                <Image src={image} layout='fill'  alt={`${title} - ${description}`} />
            </div>
            <div className="sm:hidden">
                <Image src={imageMobile} layout='fill'  alt={`${title} - ${description}`} className=""/>
            </div>
        </section>
    )
}