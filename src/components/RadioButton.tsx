import clsx from "clsx";
import { IoIosCheckmark } from "react-icons/io";

interface RadioButton {
  field: string;
  isChecked: boolean;
  setFieldValue: (field: string, value: any) => void;
}

export const RadioButton = ({
  field,
  isChecked,
  setFieldValue,
}: RadioButton) => {
  return (
    <div
      className={clsx("border border-gray-600 rounded-md cursor-pointer", {
        "bg-success-400 border-success-400": isChecked,
      })}
      onClick={() => setFieldValue(field, !isChecked)}
    >
      <IoIosCheckmark
        className={clsx("flex-none text-2xl text-white font-semibold", {
          flex: isChecked,
        })}
      />
    </div>
  );
};
