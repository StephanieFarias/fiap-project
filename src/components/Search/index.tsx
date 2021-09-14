import { FiSearch} from 'react-icons/fi'

export const Search = () =>{
    return (
        <div className="relative  text-gray-600 focus-within:text-gray-400 ">
        <input type="text" className="w-full h-8 py-2 text-sm  rounded-sm text-white  placeholder-primary-300 border-primary-400 border-2 px-2 focus:outline-none focus:text-primary-400" placeholder="Buscar..." autoComplete="off"/>
        <span className="absolute inset-y-0 right-2 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <FiSearch color="#FC5BB3" size="24"/>
          </button>
        </span>
      </div>
    )
}