import Image from 'next/image';
import { ReactElement } from 'react';

interface BannerProps{
    image:string;
    text:string;
    className?:string;
}

export const Banner = ({image,text,className}:BannerProps) =>{
    return(
        <>
            <figure className={`w-5/12 ${className} sm:hidden`}>
                <Image src={image} alt={text} width="153" height="68" objectFit="fill"/>
                <figcaption className="hidden uppercase">{text}</figcaption>
            </figure>
            <figure className={`w-5/12 ${className} hidden sm:flex flex-col relative`}>
                <Image src={image} alt={text} width="333" height="247" objectFit="fill"/>
                <figcaption className="uppercase text-white text-base font-bold bg-opacity-75 absolute bottom-0 bg-success-400 w-full p-8">{text}</figcaption>
            </figure>
        </>
    )
}