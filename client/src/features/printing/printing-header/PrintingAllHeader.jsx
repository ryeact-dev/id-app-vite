import { DateRangePicker } from '@/common/date-picker/date-range-picker/DateRangePicker';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import ModalContainer from '@/containers/ModalContainer';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function PrintingAllHeader({ tabValue }) {
  const [isOpen, setIsopen] = useState(false);

  const handleAddStudent = () => {
    setIsopen(true);
  };

  return (
    <>
      {tabValue === 'single-print' ? (
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search student name...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
          {/* <Button
            onClick={handleAddStudent}
            type='button'
            className='text-white font-semibold'
          >
            Add Student
          </Button> */}
        </div>
      ) : tabValue === 'validate' ? (
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search student name...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
          />
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <DateRangePicker />
          <Button type='button' className='text-white font-semibold px-8'>
            Print All
          </Button>
        </div>
      )}

      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          title={'Student Info'}
          size={'max-w-3xl'}
          modalType={'add-student'}
          payload={null}
        />
      )}
    </>
  );
}
