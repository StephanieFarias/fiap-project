import { FiBookOpen, FiCalendar, FiHome, FiUser} from "react-icons/fi";

export const MenuMobile = () =>{
    return (
        <div className="flex bg-blue-700 justify-around w-screen fixed bottom-0">
            <div className="flex flex-col text-white items-center w-1/4 p-3 text-sm">
                <FiHome size={20} className="mb-1"/>
                Início
            </div>
            <div className="flex flex-col text-white items-center w-1/4 p-3 text-sm">
                <FiCalendar size={20} className="mb-1"/>
                Calendário
            </div>
            <div className="flex flex-col text-white items-center w-1/4 p-3 text-sm">
                <FiBookOpen size={20} className="mb-1"/>
                Notícias
            </div>
            <div className="flex flex-col text-white items-center w-1/4 p-3 text-sm">
                <FiUser size={20} className="mb-1"/>
                Perfil
            </div>
        </div>
    )
}