export type SortOptions = {
  value: string;
  label: string;
};

interface SelectInputProps {
  options: SortOptions[];
  currentValue: string;
  onChange: (value: string) => void;
}

function SelectInput({ options, currentValue, onChange }: SelectInputProps) {
  return (
    <select value={currentValue} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export default SelectInput;
