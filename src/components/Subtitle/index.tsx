export interface SubTitleProps {
    text:string;
    color?:"primary" |"secondary";
}

export const SubTitle = ({text,color = "primary"}:SubTitleProps) =>{
    return <h2 className={`text-${color}-400 uppercase font-bold text-sm sm:text-2xl`}>{text}</h2>
}