import DebounceInput from '@/common/debounce-input/DebounceInput';
import { Button } from '@/common/ui/button';

import { PlusCircle, Search } from 'lucide-react';

export default function UsersHeader({
  setModalSetting,
  setIsopen,
  setSearchParams,
}) {
  const handleAddStudent = () => {
    const modalData = {
      confirmation: null,
      title: 'User Info',
      size: 'max-w-2xl',
      modalType: 'add-user',
      payload: null,
    };

    setModalSetting(modalData);
    setIsopen(true);
  };

  const handleChange = (value) => {
    setSearchParams(
      (prev) => {
        prev.set('fullname', value);
        prev.set('page', 1);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <DebounceInput setterFunction={handleChange} debounceTime={1000} />
        </div>

        <Button
          onClick={handleAddStudent}
          type='button'
          className='text-white font-semibold'
        >
          <PlusCircle size={18} className='mr-2' /> Add User
        </Button>
      </div>
    </>
  );
}
