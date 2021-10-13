import Select from 'react-select';
import { IOption } from '../../types/IOption';

export interface ISelectBoxProps {
  options: Array<IOption>;
  value: IOption;
  isDisabled?: boolean;
  field: string;
  setFieldValue: (field: string, value: any) => void
  onComplete?: Function;
  isClearable?: boolean;
}

export const SelectBox = ({
  options,
  field,
  value,
  isDisabled,
  setFieldValue,
  onComplete = () => {},
  isClearable = false,
}: ISelectBoxProps) => {
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

export default SelectBox;