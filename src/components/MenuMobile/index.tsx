import { useRouter } from 'next/router';
import { FiBookOpen, FiCalendar, FiHome, FiUser } from 'react-icons/fi';
import { getPatientId } from '../../services/auth';

export const MenuMobile = () => {
  const router = useRouter();
  const id = getPatientId();
  return (
    <div className="fixed bottom-0 flex justify-around w-screen bg-blue-700 sm:hidden">
      <div
        className="flex flex-col items-center w-1/4 p-3 text-sm text-white"
        onClick={() => {
          router.push(`/`);
        }}
      >
        <FiHome size={20} className="mb-1" />
        Início
      </div>
      <div className="flex flex-col items-center w-1/4 p-3 text-sm text-white">
        <FiCalendar size={20} className="mb-1" />
        Calendário
      </div>
      <div className="flex flex-col items-center w-1/4 p-3 text-sm text-white">
        <FiBookOpen size={20} className="mb-1" />
        Notícias
      </div>
      <div
        className="flex flex-col items-center w-1/4 p-3 text-sm text-white"
        onClick={() => {
          id && router.push(`/user/${getPatientId()}`);
        }}
      >
        <FiUser size={20} className="mb-1" />
        Perfil
      </div>
    </div>
  );
};
