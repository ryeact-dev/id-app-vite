import { Send, XCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { departmentSchema } from '@/lib/schema';
import { INITIAL_DEPARTMENT_OBJ } from '@/lib/globalConstants';

import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { Card, CardContent } from '@/common/ui/card';
import { useAddDepartment } from '@/hooks/department.hook';

export default function AddDepartmentModalBody({ payload, closeModal }) {
  const handleAddDepartmentMutation = useAddDepartment(closeModal);

  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: payload ? payload : INITIAL_DEPARTMENT_OBJ,
  });

  const onSubmit = (data) => {
    let forAddingData = {
      ...data,
    };
    let isNew = payload ? false : true;

    if (payload) {
      forAddingData = {
        ...forAddingData,
        id: payload.id,
      };
      handleAddDepartmentMutation.mutate({ forAddingData, isNew });
    } else {
      handleAddDepartmentMutation.mutate({ forAddingData, isNew });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className='mt-4'>
            <FormField
              className='flex-1'
              control={form.control}
              name='departmentName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a department...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
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
              className='flex-1 bg-accent hover:bg-accent/90 px-4 w-44'
              disabled={handleAddDepartmentMutation.isPending}
            >
              <Send size={16} className='mr-1' />{' '}
              {handleAddDepartmentMutation.isPending
                ? 'Submitting...'
                : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
