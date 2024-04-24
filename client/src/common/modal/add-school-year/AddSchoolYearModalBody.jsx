'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Send, XCircle } from 'lucide-react';
import { schoolYearSchema } from '@/lib/schema';
import { CalendarIcon } from '@radix-ui/react-icons';
import { INITIAL_SCHOOL_YEAR_OBJ } from '@/lib/globalConstants';

import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Card, CardContent } from '@/common/ui/card';

export default function AddSchoolYearModalBody({ closeModal }) {
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
        <Card>
          <CardContent className='mt-6'>
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
              className='flex-1 bg-accent hover:bg-accent/90 px-4'
              // disabled={onAddUserMutation.isPending}
            >
              <Send size={16} className='mr-1' />{' '}
              {/* {onAddUserMutation.isPending ? 'Submitting...' : 'Submit'} */}
              Submitting...
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
