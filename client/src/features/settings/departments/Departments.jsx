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
import { useGetAllDepartments } from '@/hooks/department.hook';
import { Trash } from 'lucide-react';

export default function Departments({ setIsOpen, setModalSetting }) {
  const { data: listOfDepartments = [] } = useGetAllDepartments();

  const handleAddDepartment = (payload) => {
    let modalData;

    if (payload) {
      modalData = {
        confirmationType: null,
        title: 'Update Department',
        size: 'max-w-lg',
        modalType: 'add-department',
        payload,
      };
    } else {
      modalData = {
        confirmationType: null,
        title: 'Add Department',
        size: 'max-w-lg',
        modalType: 'add-department',
        payload: null,
      };
    }

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const onDeleteDepartment = (id) => {
    const modalData = {
      confirmationType: 'delete-department',
      title: 'Delete Department?',
      size: 'max-w-lg',
      modalType: 'confirmation',
      payload: id,
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
              onClick={handleAddDepartment}
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
                    <div className='font-medium -mb-1'>
                      {department.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {/* <Button
                        onClick={() => handleAddDepartment(department)}
                        size='sm'
                        variant='outline'
                      >
                        Edit
                      </Button> */}
                      <Button
                        size='sm'
                        onClick={() => onDeleteDepartment(department.id)}
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
