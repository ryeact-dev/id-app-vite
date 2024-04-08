import { useState } from 'react';

import { Button } from '@/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import ModalContainer from '@/containers/ModalContainer';

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

export default function Programs() {
  const [isOpen, setIsopen] = useState(false);

  const handleAddProgramClick = () => {
    setIsopen(true);
  };
  return (
    <>
      <Card className='overflow-hidden'>
        <div className='p-4 bg-accent text-primary-foreground flex justify-between items-center'>
          <CardHeader className='p-0 space-y-0'>
            <CardTitle>Programs</CardTitle>
            <CardDescription className='text-primary-foreground'>
              List of all candidates for this event
            </CardDescription>
          </CardHeader>
          <div>
            <Button
              variant='outline'
              className='hover:bg-background hover:text-secondary-foreground'
              onClick={handleAddProgramClick}
            >
              Add Program
            </Button>
          </div>
        </div>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programOffering.map((program) => (
                <TableRow key={program.value}>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{program.label}</div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button size='sm' variant='outline'>
                        Edit
                      </Button>
                      <Button size='sm'>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          title={'Add Program'}
          size={'max-w-lg'}
          modalType={'add-program'}
          payload={null}
        />
      )}
    </>
  );
}
