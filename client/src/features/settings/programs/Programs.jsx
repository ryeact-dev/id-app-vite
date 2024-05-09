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
import { useGetAllPrograms } from '@/hooks/program.hook';
import { PenBox, Trash } from 'lucide-react';

export default function Programs({ setIsOpen, setModalSetting }) {
  const { data: listOfPrograms = [] } = useGetAllPrograms();

  const handleAddEditProgram = (programData) => {
    const payload = programData ? programData : null;

    const modalData = {
      confirmationType: null,
      title: 'Program Details',
      size: 'max-w-lg',
      modalType: 'add-program',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleDeleteProgram = (program) => {
    const modalData = {
      confirmationType: 'delete-program',
      title: `Delete ${program.program}?`,
      size: 'max-w-lg',
      modalType: 'confirmation',
      payload: program.id,
    };

    setModalSetting(modalData);
    setIsOpen(true);
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
              onClick={() => handleAddEditProgram(null)}
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
              {listOfPrograms?.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className='font-medium'>
                    <div className='font-medium'>
                      <p>{program.program}</p>
                      <p className='text-xs italic opacity-50 -mt-1'>
                        {program.department}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        onClick={() => handleAddEditProgram(program)}
                        size='sm'
                        variant='outline'
                      >
                        <PenBox className='size-4 mr-1' /> Edit
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleDeleteProgram(program)}
                      >
                        <Trash className='size-4 mr-1' />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
