'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { schoolYearSchema } from '@/lib/schema';
import { INITIAL_SCHOOL_YEAR_OBJ } from '@/lib/globalConstants';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Save } from 'lucide-react';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';

export default function AddSchoolYearModalBody() {
  const form = useForm({
    resolver: zodResolver(schoolYearSchema),
    defaultValues: INITIAL_SCHOOL_YEAR_OBJ,
  });

  const onSubmit = (data) => {
    const { syFrom, syTo } = data;

    ToastNotification('success', `SY ${syFrom}-${syTo} has been added.`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between w-full gap-4'>
          <FormField
            className='flex-1'
            control={form.control}
            name='syFrom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Year From:</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <CalendarIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='number'
                      min={2020}
                      placeholder='Year From...'
                      className='pl-8 w-full sm:w-[100%]'
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            className='flex-1'
            control={form.control}
            name='syTo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Year To:</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <CalendarIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='number'
                      min={2020}
                      placeholder='Year From...'
                      className='pl-8 w-full sm:w-[100%]'
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
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
