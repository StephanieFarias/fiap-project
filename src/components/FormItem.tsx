import clsx from "clsx";

interface FormItemProps {
  title: string;
  errors: string | undefined;
  touched: boolean | undefined;
  values: any;
  field: string;
  className?: string;
  type?:string;
  setFieldValue: (field: string, value: any) => void
}

export const FormItem = ({ title, errors, className, touched, values, field, setFieldValue,type="text" }: FormItemProps) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      <p className="text-sm uppercase text-primary-400">{title}*</p>
      <input
        className={clsx(
          `w-full py-1 bg-transparent text-sm outline-none border-transparent border-b-2 border-gray-600 ${className}`,
          {}
        )}
        id={field}
        name={field}
        value={values.name}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue( field, value );
        }}
        type={type}
      />
      {errors && touched && (
        <p className="text-sm font-light text-left text-red-500 ">
          {errors}
        </p>
      )}
    </div>
  );
};
