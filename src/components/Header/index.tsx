import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiSettings, FiArrowLeft } from 'react-icons/fi';
import { getPatientId } from '../../services/auth';

export const Header = () => {
  const router = useRouter();
  const user = {
    name: 'mock-name',
    avatar: '/images/mock-avatar.jpg',
  }; //mocked validate session

  return (
    <>
      {/* desktop header */}
      <header className="items-center justify-between hidden h-20 px-32 bg-gray-400 sm:flex">
        <Image
          src="/images/logo.png"
          alt="Dr. Consulta Logo"
          width={181}
          height={39}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />

        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.name}
            width={52}
            height={52}
            className="rounded-full cursor-pointer"
            onClick={() => router.push(`/user/${getPatientId()}`)}
          />
        )}
      </header>

      {/* mobile header */}
      <header className="flex items-center justify-between w-screen h-20 px-3 bg-gray-400 sm:hidden">
        <FiArrowLeft size="24" className="text-primary-400" />
        <Image
          src="/images/logo.png"
          alt="Dr. Consulta Logo"
          width={181}
          height={39}
        />
        <FiSettings size="24" className="text-success-400" />
      </header>
    </>
  );
};
