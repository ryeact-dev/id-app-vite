import NoRecordsFound from '@/common/typography/NoRecordsFound';
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
import { PenBox, Trash } from 'lucide-react';

export default function Departments({
  setIsOpen,
  setModalSetting,
  listOfDepartments,
}) {
  const handleAddDepartment = (departmentData) => {
    const payload = departmentData ? departmentData : null;

    const modalData = {
      confirmationType: null,
      title: 'Add Department',
      size: 'max-w-lg',
      modalType: 'add-department',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleDeleteDepartment = (department) => {
    const modalData = {
      confirmationType: 'delete-department',
      title: `Delete ${department.departmentName}?`,
      size: 'max-w-lg',
      modalType: 'confirmation',
      payload: department.id,
    };

    setModalSetting(modalData);
    setIsOpen(true);
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
              onClick={() => handleAddDepartment(null)}
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
              {listOfDepartments?.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{department.label}</div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        onClick={() => handleAddDepartment(department)}
                        size='sm'
                        variant='outline'
                      >
                        <PenBox className='size-4 mr-1' /> Edit
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleDeleteDepartment(department)}
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
          {listOfDepartments?.length === 0 && (
            <NoRecordsFound>No Records Found.</NoRecordsFound>
          )}
        </CardContent>
      </Card>
    </>
  );
}
