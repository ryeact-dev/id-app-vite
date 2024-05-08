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

export default function SchoolYear({
  setIsOpen,
  setModalSetting,
  listOfSchoolYear,
}) {
  const handleSchoolYearToggleStatus = useSchoolYearToggleStatus();

  const handleToggleStatus = (schoolYear) => {
    const forUpdatingData = {
      id: schoolYear.id,
      isActive: schoolYear.isActive ? false : true,
    };

    handleSchoolYearToggleStatus.mutate({ forUpdatingData });
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
    let modalData;
    if (schoolYearData) {
      modalData = {
        confirmationType: null,
        title: 'Edit School Year',
        size: 'max-w-lg',
        modalType: 'add-school-year',
        payload: schoolYearData,
      };
    } else {
      modalData = {
        confirmationType: null,
        title: 'Add School Year',
        size: 'max-w-lg',
        modalType: 'add-school-year',
        payload: null,
      };
    }
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
                      onClick={() => handleToggleStatus(schoolYear)}
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
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleDeleteSchoolYear(schoolYear)}
                      >
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
