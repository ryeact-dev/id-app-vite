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

const programOffering = [
  {
    value: 'bs-ece',
    label: 'BS-Electronics Engg',
  },
  {
    value: 'bs-ee',
    label: 'BS-Electrical Engg',
  },
  {
    value: 'bs-coe',
    label: 'BS-Computer Engg',
  },
  {
    value: 'bs-it',
    label: 'BS-Information Tech',
  },
  {
    value: 'bs-cs',
    label: 'BS-Computer Science',
  },
  {
    value: 'bsba-fin',
    label: 'BSBA-Financial Mgt',
  },
  {
    value: 'bsba-mktg',
    label: 'BSBA-Marketing Mgt',
  },
  {
    value: 'bsba-hr',
    label: 'BSBA-Human Resource Mgt',
  },
  {
    value: 'bs-tm',
    label: 'BS-Tourism Mgt',
  },
  {
    value: 'bs-hm',
    label: 'BS-Hospitality Mgt',
  },
  {
    value: 'bs-crim',
    label: 'BS-Criminology',
  },
  {
    value: 'ab-eng',
    label: 'AB-English Language',
  },
  {
    value: 'bs-psy',
    label: 'BS-Psychology',
  },
  {
    value: 'beed',
    label: 'Bachelor in Elementary Educ',
  },
  {
    value: 'bsed-eng',
    label: 'BSED-English',
  },
  {
    value: 'bsed-math',
    label: 'BSED-Mathematics',
  },
];

export default function ProgramOffers({
  handleProgramValueChange,
  programValue,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select Program'
          className='w-full justify-between dark:text-white'
        >
          {programValue
            ? programOffering.find(
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
              {programOffering.map((framework) => (
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
