import { Search } from 'lucide-react';

import ProgramOffers from './components/ProgramOffers';
import BirthdatePicker from './components/BirthdatePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/ui/form';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Label } from '@/common/ui/label';
import { Textarea } from '@/common/ui/textarea';

export default function StudentFormInputs({ form }) {
  const handleDateChange = (date) => {
    form.setValue('birthDate', date);
  };

  const handleProgramValueChange = (value) => {
    form.setValue('program', value);
  };

  return (
    <Card className='relative flex-[2] rounded-md space-y-2'>
      <CardHeader className='p-0 m-0  rounded-t-md'>
        <CardTitle className='px-4 pt-2'>Student Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 px-4'>
        {/* Student Name */}
        <FormField
          control={form.control}
          name='idNumber'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <div className='relative sm:w-[300px] md:w-[200px] lg:w-200px]'>
                  <Button
                    type='button'
                    className='absolute right-0 top-0 rounded-sm rounded-tl-none rounded-bl-none'
                  >
                    <Search className='h-4 w-4 text-white' strokeWidth={3} />
                  </Button>
                  <Input
                    type='search'
                    placeholder='Search Id Number...'
                    className='pr-8 '
                    {...field}
                  />
                </div>
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Last Name' {...field} />
              </FormControl>

              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='flex-[2] space-y-0'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
                </FormControl>

                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='middleInitial'
            render={({ field }) => (
              <FormItem className='flex-1 space-y-0'>
                <FormLabel>Middle Initial</FormLabel>
                <FormControl>
                  <Input placeholder='Middle Initial' {...field} />
                </FormControl>

                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        {/* Student Birthday and Program */}
        <div className='flex gap-2'>
          <div className='flex-1'>
            <Label
              className={`text-sm ${
                form.formState.errors?.birthDate ? 'text-red-500' : ''
              }`}
              htmlFor='birthdate'
            >
              Birthdate
            </Label>
            <BirthdatePicker
              handleDateChange={handleDateChange}
              selectedDate={form.watch('birthDate')}
            />
          </div>
          <div className='flex-[2]'>
            <Label
              className={`text-sm ${
                form.formState.errors?.program ? 'text-red-500' : ''
              }`}
              htmlFor='course'
            >
              Program
            </Label>
            <ProgramOffers
              handleProgramValueChange={handleProgramValueChange}
              programValue={form.watch('program')}
            />
          </div>
        </div>

        {/* Student Full Address */}
        <FormField
          control={form.control}
          name='fullAddress'
          render={({ field }) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel>Full Address</FormLabel>
              <FormControl>
                <Textarea
                  className='min-h-[100px] resize-none'
                  placeholder='Enter your full address'
                  {...field}
                />
              </FormControl>

              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
