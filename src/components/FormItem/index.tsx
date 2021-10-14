import clsx from "clsx";

export interface FormItemProps {
  title: string;
  errors: string | undefined;
  touched: boolean | undefined;
  value: any;
  field: string;
  isDisabled?: boolean;
  type?: string;
  className?: string;
  mask?: (value: any) => any;
  setFieldValue: (field: string, value: any) => void;
}

export const FormItem = ({
  title,
  errors,
  className,
  touched,
  value,
  field,
  isDisabled = false,
  type = '',
  mask,
  setFieldValue,
}: FormItemProps) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      <p className="text-sm uppercase text-primary-400">{title}{isDisabled ? '' : '*'}</p>
      <input
        className={clsx(
          `w-full py-1 bg-transparent outline-none border-transparent text-gray-800 ${className}`,
          {
            'border-b-2 border-gray-600 text-lg': !isDisabled,
            'text-xl': isDisabled
          }
        )}
        type={type}
        id={field}
        name={field}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue(field, value);
        }}
        disabled={isDisabled}
      />
      {errors && touched && (
        <p className="text-sm font-light text-left text-red-500 ">{errors}</p>
      )}
    </div>
  );
};
