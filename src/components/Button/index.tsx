interface ButtonProps {
    handleSubmit():void;
    text:string;
    theme?:"primary" | "success"
}

export const Button = ({text,handleSubmit,theme = "primary"} : ButtonProps) =>{

    return (
        <button
        className={`flex items-center justify-center w-full self-center px-3 py-1 mt-10 space-x-2 font-bold border rounded-full text-md  ${theme === "primary" ?  `bg-primary-100  text-primary-400 border-primary-400` : "text-white  bg-success-400"}`}
        onClick={() => {
          handleSubmit();
        }}
        type="submit"
      >
        <p>{text}</p> 
      </button>
    )
}