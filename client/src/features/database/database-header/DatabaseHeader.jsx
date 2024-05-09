import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';

import { Search } from 'lucide-react';

export default function DatabaseHeader({
  tabValue,
  setIsOpen,
  setModalSetting,
}) {
  const handleAddEditStudent = (studentData) => {
    const payload = studentData ? studentData : null;

    const modalData = {
      confirmationType: null,
      title: 'Student Details',
      size: 'max-w-2xl',
      modalType: 'add-student',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search student name...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white'
          />
        </div>

        <Button
          onClick={handleAddEditStudent}
          type='button'
          className='text-white font-semibold'
        >
          Add Student
        </Button>
      </div>
    </>
  );
}
