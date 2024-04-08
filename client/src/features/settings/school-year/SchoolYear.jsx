import { useState } from 'react';

import ModalContainer from '@/containers/ModalContainer';
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
import { Badge } from '@/common/ui/badge';

export default function SchoolYear() {
  const [isOpen, setIsopen] = useState(false);

  const handleAddSchoolYearClick = () => {
    setIsopen(true);
  };

  return (
    <>
      <Card className='overflow-hidden'>
        <div className='p-4 bg-accent text-primary-foreground flex justify-between items-center'>
          <CardHeader className='p-0 space-y-0'>
            <CardTitle>School Year</CardTitle>
            <CardDescription className='text-primary-foreground'>
              List of all candidates for this event
            </CardDescription>
          </CardHeader>
          <div>
            <Button
              variant='outline'
              className='hover:bg-background hover:text-secondary-foreground'
              onClick={handleAddSchoolYearClick}
            >
              Add School Year
            </Button>
          </div>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>2023 - 24</div>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>Active</Badge>
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
                  <div className='font-medium -mb-1'>2024 - 25</div>
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>Inactive</Badge>
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
      <ModalContainer
        isOpen={isOpen}
        setIsOpen={setIsopen}
        title={'Add School Year'}
        size={'max-w-lg'}
        modalType={'add-school-year'}
        payload={null}
      />
    </>
  );
}
