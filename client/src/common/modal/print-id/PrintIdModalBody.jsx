import FrontPage from './components/front-page/FrontPage';
import BackPage from './components/back-page/BackPage';
import { Printer, XCircle } from 'lucide-react';
import { Button } from '@/common/ui/button';

export default function PrintIdModalBody({ payload, closeModal }) {
  return (
    <>
      <div className='flex gap-4 items-center justify-around border-2 px-1 py-3 rounded-lg'>
        <FrontPage payload={payload} />
        <BackPage payload={payload} />
      </div>
      {/* Footer Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 md:mt-6'>
        <div className='flex-1' />
        <div className='flex-1 flex items-center gap-2'>
          <Button
            type='button'
            onClick={() => closeModal()}
            className='flex-1 border border-destructive hover:bg-destructive'
            variant='ghost'
          >
            <XCircle size={16} className='mr-1' /> Cancel
          </Button>
          <Button
            type='submit'
            className='flex-1 bg-accent hover:bg-accent/90 px-4 w-44 '
            //   disabled={handleAddEditStudentMutation.isPending}
          >
            <Printer size={16} className='mr-1' />
            {/* {handleAddEditStudentMutation.isPending
                ? 'Submitting...'
                : 'Submit'} */}
            Printing...
          </Button>
        </div>
      </div>
    </>
  );
}
