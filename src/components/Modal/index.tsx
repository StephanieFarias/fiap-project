import clsx from 'clsx';
import { FiX } from 'react-icons/fi';
import { Button } from '../Button';

export interface IModalProps {
  children: any;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({ children, title, onClose, onConfirm }: IModalProps) => {

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div className="absolute flex items-center justify-center w-full h-full mt-0 ml-0 bg-transparent">
        <div className="p-4 rounded-md bg-opacity-95 bg-primary-400 w-96 h-72">
          <div className="flex flex-row justify-end text-2xl">
            <a href="#" onClick={handleCloseClick}>
              <FiX className="text-white"/>
            </a>
          </div>
          {title && <div className="font-semibold text-white 2xl">{title}</div>}
          <div className="pt-3">{children}</div>
          <div className="px-10 uppercase"> 
            <Button theme="success" text="confirmar" handleSubmit={() => onConfirm()} />
          </div>
        </div>
      </div>
    </>
  );
};
