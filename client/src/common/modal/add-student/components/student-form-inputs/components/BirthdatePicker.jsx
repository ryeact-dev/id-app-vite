import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

export default function BirthdatePicker({ handleDateChange, selectedDate }) {
  return (
    <ReactDatePicker
      className='w-48 border-2 rounded-md h-9 text-sm font-medium'
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      minDate={new Date(1800, 0, 1)}
      onChange={(date) => handleDateChange(date)}
      icon={<Calendar className='mt-0.5' />}
    />
  );
}
