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

export default function Departments() {
  const [isOpen, setIsopen] = useState(false);

  const handleAddStudent = () => {
    setIsopen(true);
  };

  return (
    <>
      <Card className='overflow-hidden'>
        <div className='p-4 bg-accent text-primary-foreground flex justify-between items-center'>
          <CardHeader className='p-0 space-y-0'>
            <CardTitle>Departments</CardTitle>
            <CardDescription className='text-primary-foreground'>
              List of all candidates for this event
            </CardDescription>
          </CardHeader>
          <div>
            <Button
              type='button'
              variant='outline'
              className='hover:bg-background hover:text-secondary-foreground'
              onClick={handleAddStudent}
            >
              Add Department
            </Button>
          </div>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    Department of Engineering Education
                  </div>
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
              <TableRow>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    Department of Teacher Education
                  </div>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          title={'Add Department'}
          size={'max-w-lg'}
          modalType={'add-department'}
          payload={null}
        />
      )}
    </>
  );
}
