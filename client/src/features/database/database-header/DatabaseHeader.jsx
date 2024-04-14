import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import ModalContainer from '@/containers/ModalContainer';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function DatabaseHeader({ tabValue }) {
  const [isOpen, setIsopen] = useState(false);

  const handleAddStudent = () => {
    setIsopen(true);
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
          onClick={handleAddStudent}
          type='button'
          className='text-white font-semibold'
        >
          Add Student
        </Button>
      </div>
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          title={'Student Info'}
          size={'max-w-2xl'}
          modalType={'add-student'}
          payload={null}
        />
      )}
    </>
  );
}
