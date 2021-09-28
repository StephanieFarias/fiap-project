import Image from 'next/image'
import { FiSettings ,FiArrowLeft} from "react-icons/fi";

export const Header= () =>{
    const user = {
        name:"mock-name",
        avatar:'/images/mock-avatar.jpg',
    } //mocked validate session

    return (
        <>
            {/* desktop header */}
            <header className="bg-gray-400 px-32 items-center justify-between h-20 hidden sm:flex">
                <Image src="/images/logo.png" alt="Dr. Consulta Logo" width={181} height={39} />

                {user.avatar && <Image src={user.avatar} alt={user.name} width={52} height={52} className="rounded-full"  />}
            </header>

            {/* mobile header */}
            <header className="bg-gray-400 px-3 flex items-center justify-between h-20 w-screen sm:hidden">
                <FiArrowLeft size="24" className="text-primary-400"/>
                <Image src="/images/logo.png" alt="Dr. Consulta Logo" width={181} height={39} />
                <FiSettings size="24" className="text-success-400"/>
            </header>
        </>        
    )
}
