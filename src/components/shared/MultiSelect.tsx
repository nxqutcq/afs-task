import { useEffect, useRef, useState } from 'react';
import { Option } from './SingleSelect';

interface MultiSelectProps {
  options: Option[];
  defaultSelected?: string[];
  onChange?: (values: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultSelected = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] =
    useState<string[]>(defaultSelected);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (value: string) => {
    let newSelected;
    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((v) => v !== value);
    } else {
      newSelected = [...selectedValues, value];
    }
    setSelectedValues(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayText = () => {
    if (selectedValues.length === 0) return 'Select options';
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(', ');
  };

  return (
    <div className="custom-select custom-select--multi" ref={selectRef}>
      <div className="custom-select__control" onClick={handleToggle}>
        <span className="custom-select__value">{getDisplayText()}</span>
        <span
          className={`custom-select__chevron ${
            isOpen ? 'custom-select__chevron--open' : ''
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select__menu custom-select__menu--multi">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__menu-item custom-select__menu-item--multi"
            >
              <label className="custom-select__checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
