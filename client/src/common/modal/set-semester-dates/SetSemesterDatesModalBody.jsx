import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/common/ui/button';
import { Calendar } from '@/common/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/popover';
import { useState } from 'react';
import { Send, XCircle } from 'lucide-react';
import { useSetSemesterDates } from '@/hooks/semester.hook';

export default function SetSemesterDatesModalBody({
  payload,
  closeModal,
  className,
}) {
  const [date, setDate] = useState({
    from: payload.semestralDateStart
      ? new Date(payload.semestralDateStart)
      : new Date(),
    to: payload.semestralDateEnd
      ? new Date(payload.semestralDateEnd)
      : addDays(new Date(), 30),
  });

  const handleSetSemesterDatesMutation = useSetSemesterDates(closeModal);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    let forAddingData = {
      ...payload,
      semestralDateStart: date.from,
      semestralDateEnd: date.to,
    };
    let isNew = true;

    if (payload.id) {
      forAddingData = {
        ...forAddingData,
        id: payload.id,
      };
      isNew = false;

      handleSetSemesterDatesMutation.mutate({
        forAddingData,
        isNew,
      });
    } else {
      handleSetSemesterDatesMutation.mutate({
        forAddingData,
        isNew,
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              className={cn(
                'w-full justify-center text-center font-semibold h-12',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='center'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>{' '}
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
            className='flex-1 bg-accent hover:bg-accent/90 px-4 w-48'
            disabled={handleSetSemesterDatesMutation.isPending}
          >
            <Send size={16} className='mr-1' />{' '}
            {handleSetSemesterDatesMutation.isPending
              ? 'Submitting...'
              : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}
