import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/popover';
import { Button } from '@/common/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/common/ui/command';

export default function ProgramOffers({
  handleProgramValueChange,
  programValue,
  listOfPrograms,
}) {
  const [open, setOpen] = useState(false);

  const programOffering = listOfPrograms?.map((program) => ({
    value: program.id,
    label: program.programName,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select Program'
          className={`w-full justify-between dark:text-white ${
            programValue ? '' : 'text-foreground/50'
          }`}
        >
          {programValue
            ? programOffering?.find(
                (framework) => framework.value === programValue
              )?.label
            : 'Select Program'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50 hidden lg:block' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search program...' />
          <CommandList>
            <CommandEmpty>Program not found.</CommandEmpty>
            <CommandGroup>
              {programOffering?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    handleProgramValueChange(
                      currentValue === programValue ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      programValue === framework.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
