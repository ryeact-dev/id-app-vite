import { useState } from 'react';
import { Check, ChevronsUpDown, Send, XCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { programSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { INITIAL_PROGRAM_OBJ } from '@/lib/globalConstants';

import { Button } from '@/common/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/ui/form';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/common/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/popover';
import { Input } from '@/common/ui/input';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Card, CardContent } from '@/common/ui/card';

const departmentAvailable = [
  {
    value: 'dte',
    label: 'Dept. of Teacher Education',
  },
  {
    value: 'DEE',
    label: 'Dept. of Engineering Education',
  },
  {
    value: 'dcje',
    label: 'Dept. of Criminal Justice Education',
  },
  {
    value: 'dbae',
    label: 'Dept. of Business Administration Education',
  },
];

export default function AddProgramModalBody({ closeModal }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: INITIAL_PROGRAM_OBJ,
  });

  const onSubmit = (data) => {
    const { program, department } = data;
    ToastNotification('success', `${program} in ${department} has been added.`);
  };

  const handleDepartmentValueChange = (value) => {
    form.setValue('department', value);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className='space-y-4 w-full'>
            <FormField
              control={form.control}
              name='program'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter a program...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-1'>
                  <FormLabel>Language</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? departmentAvailable.find(
                                (department) => department.value === field.value
                              )?.label
                            : 'Select a department'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50 hidden lg:block' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0 px-4'>
                      <Command>
                        <CommandInput
                          placeholder='Search framework...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {departmentAvailable.map((department) => (
                              <CommandItem
                                value={department.label}
                                key={department.value}
                                onSelect={() =>
                                  handleDepartmentValueChange(department.value)
                                }
                              >
                                {department.label}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    department.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
