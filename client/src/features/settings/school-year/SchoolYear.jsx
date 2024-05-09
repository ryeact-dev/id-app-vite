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
import { useSchoolYearToggleStatus } from '@/hooks/schoolyear.hook';
import { PenBox, Trash } from 'lucide-react';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';

export default function SchoolYear({
  setIsOpen,
  setModalSetting,
  listOfSchoolYear,
}) {
  const handleSchoolYearToggleStatusMutation = useSchoolYearToggleStatus();

  const handleToggleSchoolYearStatus = (schoolYear) => {
    if (schoolYear.isActive) {
      return ToastNotification('error', 'This school year is already active');
    }

    const forUpdatingData = {
      id: schoolYear.id,
      isActive: schoolYear.isActive ? false : true,
    };

    handleSchoolYearToggleStatusMutation.mutate({ forUpdatingData });
  };

  const handleDeleteSchoolYear = (schoolYearData) => {
    const title = `Remove SY:${schoolYearData.schoolYearFrom}-${schoolYearData.schoolYearTo} ?`;

    const modalData = {
      confirmationType: 'delete-school-year',
      title,
      size: 'max-w-lg',
      modalType: 'confirmation',
      payload: schoolYearData.id,
    };
    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleAddEditSchoolYearClick = (schoolYearData) => {
    const payload = schoolYearData ? schoolYearData : null;
    const title = schoolYearData ? 'Edit School Year' : 'Add School Year';

    const modalData = {
      confirmationType: null,
      size: 'max-w-lg',
      modalType: 'add-school-year',
      title,
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <>
      <Card className='overflow-hidden'>
        <div className='p-4 bg-accent text-primary-foreground flex justify-between items-center'>
          <CardHeader className='p-0 space-y-0'>
            <CardTitle>School Year</CardTitle>
            <CardDescription className='text-primary-foreground'>
              List of all school year with status
            </CardDescription>
          </CardHeader>
          <div>
            <Button
              variant='outline'
              className='hover:bg-background hover:text-secondary-foreground'
              onClick={() => handleAddEditSchoolYearClick(null)}
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
              {listOfSchoolYear?.map((schoolYear) => (
                <TableRow key={schoolYear.id}>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{`${schoolYear.schoolYearFrom} - ${schoolYear.schoolYearTo}`}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={schoolYear.isActive ? 'secondary' : 'outline'}
                      onClick={() => handleToggleSchoolYearStatus(schoolYear)}
                      className={'hover:cursor-pointer w-16'}
                    >
                      {schoolYear.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleAddEditSchoolYearClick(schoolYear)}
                      >
                        <PenBox className='size-4 mr-1' /> Edit
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleDeleteSchoolYear(schoolYear)}
                      >
                        <Trash className='size-4 mr-1' /> Delete
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
