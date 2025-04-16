import { useEffect, useRef, useState } from 'react';

export interface Option {
  label: string;
  value: string;
}

interface SingleSelectProps {
  options: Option[];
  defaultValue: string;
  onChange?: (value: string) => void;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>(
    options.find((o) => o.value === defaultValue)
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
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

  return (
    <div className="custom-select">
      <div
        className="custom-select__control"
        onClick={handleToggle}
        ref={selectRef}
      >
        <span className="custom-select__value">{selected?.label}</span>
        <span
          className={`custom-select__chevron ${
            isOpen ? 'custom-select__chevron--open' : ''
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select__menu">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__menu-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
