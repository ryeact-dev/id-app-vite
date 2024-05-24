import { ImageComponent } from '@/common/image-component/ImageComponent';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import { Search, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function ValidateStudentIdModalBody({ payload, closeModal }) {
  const [IDBarcode, setIDBarcode] = useState('');

  const onIDNumberChange = (evt) => {
    const value = evt.target.value;
    setIDBarcode(value);
  };

  const handleBarcodeKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      const removedSOnIDBarcode = IDBarcode.toUpperCase().split('S')[1];
      const IDNumber = removedSOnIDBarcode ? removedSOnIDBarcode : IDBarcode;

      setIDBarcode('');
    }
  };

  return (
    <div>
      <div className='relative'>
        <Search
          strokeWidth={2.5}
          className='absolute left-3 top-4 h-4 w-4 text-muted-foreground'
        />
        <Input
          type='number'
          id='barcode'
          value={IDBarcode || ''}
          placeholder='Enter ID number...'
          onKeyDown={handleBarcodeKeyDown}
          onChange={onIDNumberChange}
          autoFocus
          className='pl-8 w-full bg-white mb-4 h-12 font-bold placeholder:font-normal'
        />
      </div>
      <Card className='overflow-hidden rounded-md'>
        <CardContent className='p-2 flex items-start gap-2'>
          <div className='relative rounded-md size-48 shrink-0 flex items-center justify-center m-1 border border-dashed'>
            <ImageComponent
              alt='StudentPhoto'
              className='object-contain object-center h-full w-full'
              src={null}
            />
          </div>
          <div className='w-full'>
            <div>
              <Badge className='text-base font-semibold my-1 px-6'>
                ID Number
              </Badge>
              <p className='text-2xl font-bold'>Last Name</p>
              <p className='text-xl font-semibold'>First Name</p>
              <p className='text-xl font-semibold'>MI</p>
              <p className='font-bold mt-1'>Course</p>
              <p className='font-bold'>Department</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <CardFooter className='mt-4  justify-end p-0'>
        <Button className='w-36' onClick={closeModal}>
          <XCircle className='mr-1 h-4 w-4' /> Close
        </Button>
      </CardFooter>
    </div>
  );
}
