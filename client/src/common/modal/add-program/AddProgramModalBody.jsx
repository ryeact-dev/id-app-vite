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
import { Card, CardContent } from '@/common/ui/card';
import { useGetAllDepartments } from '@/hooks/department.hook';
import { useAddProgram } from '@/hooks/program.hook';

export default function AddProgramModalBody({ payload, closeModal }) {
  const [open, setOpen] = useState(false);

  const { data: listOfDepartments = [] } = useGetAllDepartments();
  const handleAddProgramMutation = useAddProgram(closeModal);

  const form = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: payload ? payload : INITIAL_PROGRAM_OBJ,
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
      handleAddProgramMutation.mutate({ forAddingData, isNew });
    } else {
      handleAddProgramMutation.mutate({ forAddingData, isNew });
    }
  };

  const handleDepartmentValueChange = (value) => {
    form.setValue('departmentId', value);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className='space-y-4 w-full mt-4'>
            <FormField
              control={form.control}
              name='programName'
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
              name='departmentId'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-1'>
                  <FormLabel>Department</FormLabel>
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
                            ? listOfDepartments.find(
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
                          <CommandEmpty>No Department found.</CommandEmpty>
                          <CommandGroup>
                            {listOfDepartments.map((department) => (
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
              className='flex-1 bg-accent hover:bg-accent/90 px-4 w-44 '
              disabled={handleAddProgramMutation.isPending}
            >
              <Send size={16} className='mr-1' />
              {handleAddProgramMutation.isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
