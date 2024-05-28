import { DateRangePicker } from '@/common/date-picker/date-range-picker/DateRangePicker';
import { Button } from '@/common/ui/button';
import { Printer } from 'lucide-react';

export default function ReportHeader({ tabValue, date, setDate }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center gap-3'>
        <DateRangePicker date={date} setDate={setDate} />
        <Button type='button' className='text-white font-semibold px-8'>
          <Printer size={16} strokeWidth={3} className='mr-1' /> Print Page
        </Button>
      </div>
    </div>
  );
}
