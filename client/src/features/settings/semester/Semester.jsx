import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Badge } from '@/common/ui/badge';
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
import {
  useGetSemesterDates,
  useSemesterToggleStatus,
} from '@/hooks/semester.hook';
import { SEMESTERS_LIST } from '@/lib/globalConstants';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

export default function Semester({
  setIsOpen,
  setModalSetting,
  listOfSchoolYear,
}) {
  const activeSchoolYearId = listOfSchoolYear?.find(
    (schoolYear) => schoolYear.isActive === true
  )?.id;

  const handleToggleSemesterStatusMutation = useSemesterToggleStatus();
  const { data: semesterDates = [] } = useGetSemesterDates(activeSchoolYearId);

  const handleToggleSemesterStatus = (semester) => {
    if (semester.isActive) {
      return ToastNotification('error', 'This school year is already active');
    }

    const forUpdatingData = {
      id: semester.id,
      isActive: semester.isActive ? false : true,
    };

    handleToggleSemesterStatusMutation.mutate({ forUpdatingData });
  };

  const handleSetSemesterDatesClick = (semesterName, semesterData) => {
    console.log(semesterData);

    if (listOfSchoolYear?.length === 0 || !activeSchoolYearId) {
      return ToastNotification(
        'error',
        'Please set and activate a school year first'
      );
    }

    // TODO: ADD VALIDATION FOR DATE RANGE CONFLICTS
    const payload = semesterData
      ? semesterData
      : { semesterName, schoolYearId: activeSchoolYearId };

    const modalData = {
      confirmationType: null,
      title: 'Set Semester Dates',
      size: 'max-w-lg',
      modalType: 'set-semester-dates',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <Card className='overflow-hidden'>
      <div className='p-4 bg-accent text-primary-foreground flex justify-between items-center'>
        <CardHeader className='p-0 space-y-0'>
          <CardTitle>Semester</CardTitle>
          <CardDescription className='text-primary-foreground'>
            List of all candidates for this event
          </CardDescription>
        </CardHeader>
        <div></div>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SEMESTERS_LIST.map((sem, index) => (
              <TableRow key={sem}>
                <TableCell className='font-medium'>
                  <div className='font-medium'>{sem}</div>
                  <div className='text-xs text-muted-foreground italic'>
                    {semesterDates[index]?.semestralDateEnd
                      ? `${format(
                          semesterDates[index]?.semestralDateStart,
                          'MMM dd, yyyy'
                        )} - ${format(
                          semesterDates[index]?.semestralDateEnd,
                          'MMM dd, yyyy'
                        )}`
                      : 'Not set'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      semesterDates[index]?.isActive ? 'secondary' : 'outline'
                    }
                    className={'hover:cursor-pointer w-16'}
                    onClick={() =>
                      handleToggleSemesterStatus(semesterDates[index])
                    }
                  >
                    {semesterDates[index]?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        handleSetSemesterDatesClick(sem, semesterDates[index])
                      }
                    >
                      <CalendarDays className='size-4 mr-1' /> Set Dates
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
