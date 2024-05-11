import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';

import { Search, UserPlus } from 'lucide-react';

export default function DatabaseHeader({ handleAddEditStudent }) {
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
          onClick={() => handleAddEditStudent(null)}
          type='button'
          className='text-white font-semibold'
        >
          <UserPlus className='size-4 mr-1' strokeWidth={3} /> Add Student
        </Button>
      </div>
    </>
  );
}
