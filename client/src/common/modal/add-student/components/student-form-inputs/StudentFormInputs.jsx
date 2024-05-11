import { Search } from 'lucide-react';
import ProgramOffers from './components/ProgramOffers';
import BirthdatePicker from './components/BirthdatePicker';
import { Card, CardContent } from '@/common/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/common/ui/form';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Label } from '@/common/ui/label';
import { Textarea } from '@/common/ui/textarea';

export default function StudentFormInputs({ form }) {
  const handleDateChange = (date) => {
    form.setValue('birthDate', new Date(date));
  };

  const handleProgramValueChange = (value) => {
    form.setValue('programId', value);
  };

  return (
    <Card className='relative flex-[2] rounded-md space-y-2 pt-2'>
      <CardContent className='space-y-1 px-4 pb-0'>
        {/* Student Name */}
        <FormField
          control={form.control}
          name='studentIdNumber'
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
                    placeholder='Search Id Number...'
                    className='pr-8 '
                    type='number'
                    {...field}
                  />
                </div>
              </FormControl>
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
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='flex-[3] space-y-0'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
                </FormControl>
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
                  <Input placeholder='MI' {...field} />
                </FormControl>
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
              programValue={form.watch('programId')}
            />
          </div>
        </div>

        <div className='relative p-2 pt-3 border rounded-md !mt-4'>
          <h2 className='absolute -top-2 bg-white px-2 text-sm font-bold'>
            In Case of Emergency
          </h2>
          {/* Guardian Info */}
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='guardian'
              render={({ field }) => (
                <FormItem className='flex-[1.5] space-y-0'>
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Guardian Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='guardianContact'
              render={({ field }) => (
                <FormItem className='flex-1 space-y-0'>
                  <FormLabel>Guardian No.</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Contact No.' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Guardian Full Address */}
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='flex-1 space-y-0 my-1'>
                <FormLabel>Full Address</FormLabel>
                <FormControl>
                  <Textarea
                    className='min-h-[60px] resize-none'
                    placeholder='Enter your full address'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
