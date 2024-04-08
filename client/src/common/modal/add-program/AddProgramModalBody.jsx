'use client';

import { Check, ChevronsUpDown, Save } from 'lucide-react';
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { programSchema } from '@/lib/schema';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import { INITIAL_PROGRAM_OBJ } from '@/lib/globalConstants';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

export default function AddProgramModalBody() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
        <FormField
          control={form.control}
          name='program'
          render={({ field }) => (
            <FormItem>
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
            <FormItem className='flex flex-col'>
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
