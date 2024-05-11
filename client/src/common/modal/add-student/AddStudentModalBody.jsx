import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchedma } from '@/lib/schema';

import { Button } from '@/common/ui/button';
import { Form } from '@/common/ui/form';
import { INITIAL_STUDENT_OBJ } from '@/lib/globalConstants';
import { useAddStudent } from '@/hooks/student.hook';
import StudentFormInputs from './components/student-form-inputs/StudentFormInputs';
import StudentImageInputs from './components/student-image-inputs/StudentImageInputs';
import { Send, XCircle } from 'lucide-react';

export default function AddStudentModalBody({ payload, closeModal }) {
  const [photo, setPhoto] = useState(payload?.photoUrl || null);
  const [esign, setEsign] = useState(payload?.esignUrl || null);

  const handleAddEditStudentMutation = useAddStudent(closeModal);

  const form = useForm({
    resolver: zodResolver(studentSchedma),
    defaultValues: payload ? payload : INITIAL_STUDENT_OBJ,
  });

  const onSubmit = (values) => {
    // const data = {
    //   id: student ? student.id : null,
    //   current_photo: student ? student.photo : null,
    //   current_esign: student ? student.e_sign : null,
    //   schoolYear: activeSchoolYear,
    //   id_number,
    //   full_name,
    //   esign,
    //   photo,
    //   addedBy: currentUser.fullName,
    // };

    // const studentData = new FormData();

    // for (const name in data) {
    //   studentData.append(name, data[name]);
    // }

    let data = {
      ...values,
      esignUrl: esign,
      photoUrl: photo,
    };

    const forAddingData = new FormData();

    for (const name in data) {
      forAddingData.append(name, data[name]);
    }

    let isNew = payload ? false : true;

    if (payload) {
      forAddingData.append('id', payload.id);
      // forAddingData.append('current_photo', payload.photoUrl);
      // forAddingData.append('current_esign', payload.esignUrl);
      handleAddEditStudentMutation.mutate({ forAddingData, isNew });
    } else {
      handleAddEditStudentMutation.mutate({ forAddingData, isNew });
    }
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
              disabled={handleAddEditStudentMutation.isPending}
            >
              <Send size={16} className='mr-1' />
              {handleAddEditStudentMutation.isPending
                ? 'Submitting...'
                : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
