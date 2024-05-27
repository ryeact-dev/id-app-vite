import FrontPage from './components/front-page/FrontPage';
import BackPage from './components/back-page/BackPage';
import { Printer, XCircle } from 'lucide-react';
import { Button } from '@/common/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';
import { useRef, useState } from 'react';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { usePrintId } from '@/hooks/printing.hook';
import { useReactToPrint } from 'react-to-print';

const REPRINT_REASONS = [
  { value: 'Printer Error', label: 'Printer Error' },
  { value: 'Lost ID', label: 'Lost ID' },
  { value: 'Details Changed', label: 'Details Changed' },
  { value: 'Damaged ID', label: 'Damaged ID' },
];

export default function PrintIdModalBody({ payload, closeModal }) {
  const componentToPrintRef = useRef();
  const [reprintReason, setReprintReason] = useState('');
  const [error, setError] = useState(false);

  const { mutate: printIdMutation, isPending } = usePrintId(closeModal);

  const onReasonChange = (value) => {
    setError(false);
    setReprintReason(value);
  };

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  });

  const onSubmitPrintId = (evt) => {
    evt.preventDefault();

    if (payload?.releasedDate && !reprintReason) {
      setError(true);
      return ToastNotification(
        'error',
        'Please select a reason for reprinting'
      );
    }

    let forAddingData;

    if (!payload?.releasedDate) {
      // Update Here
      forAddingData = {
        id: payload?.printId,
      };
      // printIdMutation({ forAddingData, isNew: false });
    } else {
      // Add New Print Here
      forAddingData = {
        schoolYearId: payload?.schoolYearId,
        semesterId: payload?.semesterId,
        studentIdNumber: payload?.student?.studentIdNumber,
        studentId: payload?.student?.id,
        printType: 'Reprint ID',
        reprintReason,
      };

      // printIdMutation({ forAddingData, isNew: true });
    }
    handlePrint();
  };

  return (
    <form onSubmit={onSubmitPrintId}>
      <div
        ref={componentToPrintRef}
        className='flex gap-4 items-center justify-around border-2 px-1 py-3 rounded-lg for-printing'
      >
        <FrontPage payload={payload?.student} />
        <BackPage payload={payload?.student} />
      </div>
      {/* Footer Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 md:mt-6'>
        <div className='flex-1'>
          <Select
            defaultValue={reprintReason}
            onValueChange={onReasonChange}
            disabled={!payload?.releasedDate}
          >
            <SelectTrigger
              className={`w-[80%] ${error && 'border-2 border-red-600'} `}
            >
              <SelectValue placeholder='Reason for Reprint' />
            </SelectTrigger>
            <SelectContent>
              {REPRINT_REASONS.map((reason) => (
                <SelectItem key={reason.value} value={reason.value}>
                  {reason.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
            disabled={isPending}
          >
            <Printer size={16} className='mr-1' />
            {isPending ? 'Printing...' : 'Print'}
          </Button>
        </div>
      </div>
    </form>
  );
}
