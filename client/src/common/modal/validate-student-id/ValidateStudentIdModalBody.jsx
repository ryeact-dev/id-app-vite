import { ImageComponent } from '@/common/image-component/ImageComponent';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import { useValidateID } from '@/hooks/idValidation.hook';
import { Search, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function ValidateStudentIdModalBody({ payload, closeModal }) {
  const [IDBarcode, setIDBarcode] = useState('');

  const { data: validatedID, mutate: validateIDMutation } =
    useValidateID(setIDBarcode);

  const onIDNumberChange = (evt) => {
    const value = evt.target.value;
    setIDBarcode(value);
  };

  const handleBarcodeKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      const removedSOnIDBarcode = IDBarcode.toUpperCase().split('S')[1];
      const IDNumber = removedSOnIDBarcode ? removedSOnIDBarcode : IDBarcode;

      const forAddingData = {
        studentIdNumber: IDNumber,
        schoolYearId: payload?.schoolYearId,
        semesterId: payload?.id,
      };

      validateIDMutation({ forAddingData });
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
          min={0}
          placeholder='Enter ID number...'
          onKeyDown={handleBarcodeKeyDown}
          onChange={onIDNumberChange}
          autoFocus
          className='pl-8 w-full bg-white mb-4 h-12 font-bold placeholder:font-normal'
        />
      </div>
      <Card className='overflow-hidden rounded-md'>
        <CardContent className='p-2 flex items-start gap-2'>
          <div className='relative overflow-hidden rounded-lg size-48 shrink-0 flex items-center justify-center m-1 border border-dashed shadow-md'>
            <ImageComponent
              alt='StudentPhoto'
              className='object-contain object-center h-full w-full'
              src={validatedID?.data.photoUrl || null}
            />
          </div>
          <div className='w-full'>
            <div>
              <Badge className='text-base font-semibold my-1 w-28 justify-center tracking-wider bg-blue-500 hover:bg-blue-500'>
                {validatedID?.data.studentIdNumber || 'ID No.'}
              </Badge>
              <p className='text-2xl font-bold'>
                {validatedID?.data.lastName || 'Last Name'}
              </p>
              <p className='text-xl font-semibold -mt-1'>
                {validatedID?.data.firstName || 'First Name'}{' '}
                {validatedID?.data.middleInitial || 'MI'}
              </p>
              <p className='text-xl font-semibold'></p>
              <p className='font-bold mt-2'>
                {validatedID?.data.program.programName || 'Program'}
              </p>
              <p className='font-bold leading-5 text-sm'>
                {validatedID?.data.program.department.departmentName ||
                  'Department'}
              </p>
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
