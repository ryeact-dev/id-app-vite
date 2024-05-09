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
import { useGetSemesterDates } from '@/hooks/semester.hook';
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
  ).id;

  const { data: semesterDates = [] } = useGetSemesterDates(activeSchoolYearId);

  const handleSetSemesterDatesClick = (semester, semesterData) => {
    // const payload = {
    //   semester,
    //   semestralDateStart: semesterData ? semesterData.semestralDateStart : null,
    //   semestralDateEnd: semesterData ? semesterData.semestralDateEnd : null,
    //   // id: semesterData ? semesterData.id : null,
    //   schoolYearId: activeSchoolYearId,
    // };

    const modalData = {
      confirmationType: null,
      title: 'Set Semester Dates',
      size: 'max-w-lg',
      modalType: 'set-semester-dates',
      payload: { semester, schoolYearId: activeSchoolYearId },
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
                    {semesterDates.length === index + 1
                      ? `${format(
                          semesterDates[index].semestralDateStart,
                          'MMM dd, yyyy'
                        )} - ${format(
                          semesterDates[index].semestralDateEnd,
                          'MMM dd, yyyy'
                        )}`
                      : 'Not set'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      semesterDates[index]?.isActive ? 'Secondary' : 'Outline'
                    }
                    className={'w-18'}
                  >
                    {semesterDates[index]?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleSetSemesterDatesClick(sem)}
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
