import { DateRangePicker } from '@/common/date-picker/date-range-picker/DateRangePicker';
import { Button } from '@/common/ui/button';

export default function ReportHeader({ tabValue }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center gap-3'>
        <DateRangePicker />
        <Button type='button' className='text-white font-semibold px-8'>
          Print
        </Button>
      </div>
    </div>
  );
}