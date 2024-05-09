import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

export default function BirthdatePicker({ handleDateChange, selectedDate }) {
  return (
    <ReactDatePicker
      className='w-32 border rounded-md h-9 text-sm font-medium placeholder:italic placeholder:text-xs placeholder:text-foreground/50 shadow-sm'
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      minDate={new Date(1800, 0, 1)}
      onChange={(date) => handleDateChange(date)}
      icon={<Calendar className='mt-0.5' />}
      placeholderText='MM/DD/YYYY'
    />
  );
}
