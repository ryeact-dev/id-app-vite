import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchedma } from '@/lib/schema';

import { Button } from '@/common/ui/button';
import { Form } from '@/common/ui/form';
import { INITIAL_STUDENT_OBJ } from '@/lib/globalConstants';
import StudentFormInputs from './components/student-form-inputs/StudentFormInputs';
import StudentImageInputs from './components/student-image-inputs/StudentImageInputs';

export default function AddStudentModalBody({ payload, closeModal }) {
  const [photo, setPhoto] = useState(null);
  const [esign, setEsign] = useState(null);

  const form = useForm({
    resolver: zodResolver(studentSchedma),
    defaultValues: payload !== null ? payload : INITIAL_STUDENT_OBJ,
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:flex-row w-full gap-3'>
          {/* Student Image Inputs - Photo and Esig */}
          <StudentImageInputs
            photo={photo}
            esign={esign}
            setPhoto={setPhoto}
            setEsign={setEsign}
          />

          {/* Student Information */}
          <StudentFormInputs form={form} />
        </div>

        {/* Footer Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 md:mt-4 px-2'>
          <div className='flex-1' />
          <div className='flex-1 flex items-center gap-2'>
            <Button
              type='button'
              onClick={() => closeModal()}
              className='flex-1 border border-destructive hover:bg-destructive'
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-accent hover:bg-accent/90'
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
