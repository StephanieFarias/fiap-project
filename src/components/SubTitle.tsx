interface SubTitleProps {
    text:string;
    color?:"primary" |"secondary";
    className?:string;
}

export const SubTitle = ({text,color = "primary",className}:SubTitleProps) =>{
    return <h2 className={`text-${color}-400 uppercase font-bold text-sm sm:text-2xl ${className}`}>{text}</h2>
}