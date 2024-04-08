'use client';

import { Save } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { departmentSchema } from '@/lib/schema';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import { INITIAL_DEPARTMENT_OBJ } from '@/lib/globalConstants';

export default function AddDepartmentModalBody() {
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: INITIAL_DEPARTMENT_OBJ,
  });

  const onSubmit = (data) => {
    const { department } = data;
    ToastNotification('success', `${department} has been added.`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          className='flex-1'
          control={form.control}
          name='department'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter a department...' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex items-center justify-end mt-6'>
          <Button type='submit'>
            <Save className='size-5 mr-1' />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}