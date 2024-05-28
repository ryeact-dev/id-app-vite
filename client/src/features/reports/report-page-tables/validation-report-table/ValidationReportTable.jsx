import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useGetPaginatedValidatedIdsReport } from '@/hooks/reports.hook';
import { format } from 'date-fns';

export default function ValidationReportTable({ date, page, onPageClick }) {
  const { data, isPlaceholderData } = useGetPaginatedValidatedIdsReport(
    date,
    Number(page) - 1,
    10
  );

  return (
    <Card>
      <CardHeader className='space-y-0'>
        <CardTitle>ID Validation Transactions</CardTitle>
        <CardDescription>
          List of ID Validations per transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Validated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.paginatedValidations.map((validationInfo) => (
              <TableRow key={validationInfo.id}>
                <TableCell className='font-medium'>
                  <div className='-mb-1 font-semibold'>
                    {`${validationInfo.student.studentIdNumber} - ${validationInfo.student.firstName} ${validationInfo.student.middleInitial} ${validationInfo.student.lastName}`}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {validationInfo.student.program.programName}
                  </div>
                </TableCell>

                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {format(
                      new Date(validationInfo.dateValidated),
                      'MMM dd, yyyy'
                    )}
                  </div>
                  <div className='text-xs text-muted-foreground md:inline'>
                    {validationInfo.user.fullName}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationBlock
          studentsCount={data?.validationsCount}
          totalStudents={data?.totalValidations}
          page={page}
          hasMore={data?.hasMore}
          onPageClick={onPageClick}
          isPlaceholderData={isPlaceholderData}
        />
      </CardFooter>
    </Card>
  );
}
