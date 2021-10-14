import Select from 'react-select';
import { IOption } from '../types/IOption';

interface SelectBoxProps {
  options: Array<IOption>;
  value: IOption;
  isDisabled?: boolean;
  field: string;
  setFieldValue: (field: string, value: any) => void
  onComplete?: Function;
  isClearable?: boolean;
}

export default function SelectBox({
  options,
  field,
  value,
  isDisabled = false,
  setFieldValue,
  onComplete = () => {},
  isClearable = false,
}: SelectBoxProps) {
  return (
    <Select
      isClearable={isClearable}
      options={options}
      className="w-full"
      value={value}
      isDisabled={isDisabled}
      onChange={(value) => {
        setFieldValue(field, value?.value);
        if (onComplete) {
          onComplete(value);
        }
      }}
    />
  );
}
