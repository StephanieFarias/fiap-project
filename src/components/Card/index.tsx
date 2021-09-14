import { IconType } from "react-icons"

export interface CardProps {
    text:string;
    Icon:IconType;
    className?:string;
}

export const Card = ({text,Icon,className}:CardProps) =>{

    return (
        <div className={`w-5/12 border-4 border-primary-400 rounded-md flex flex-col items-center justify-center p-4 ${className}` } >
            {<Icon color="#FC5BB3" size="34"/>}
            <h4 className="text-sm w-2/3 text-primary-400 mt-2 text-center font-semibold">{text}</h4>
        </div>
    )
}