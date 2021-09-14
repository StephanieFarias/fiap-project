import Image from 'next/image';

export interface JumbotronProps {
    image:string;
    title:string;
    description:string;
}

export const Jumbotron = ({image,title,description}:JumbotronProps) =>{
    return (
        <section className="w-full relative">
            <div className="absolute bottom-0 px-36 py-3">
                <h1 className="text-3xl text-white">{title}</h1>
                <h2 className="text-base text-white w-56">{description}</h2>
            </div>
            <Image src={image} layout='fill' objectFit='contain' alt={`${title} - ${description}`}/>
        </section>
    )
}