import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const CustomInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <input
        type="text"
        readOnly
        className="custom-date-input"
        onClick={onClick}
        ref={ref}
        value={value}
      />
    )
  );

  return (
    <DatePicker
      selected={selectedDate}
      dateFormat="dd/MM/yyyy"
      onChange={(date: Date | null, event) => {
        if (date) {
          setSelectedDate(date);
        }
      }}
      customInput={<CustomInput />}
    />
  );
};
