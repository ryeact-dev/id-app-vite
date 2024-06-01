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
import { useGetPaginatedPrintedIdsReport } from '@/hooks/reports.hook';
import { format } from 'date-fns';
import PrintReportBody from './components/print-report-body/PrintReportBody';

export default function PrintReportTable({
  page,
  date,
  onPageClick,
  componentToPrintRef,
}) {
  const { data, isPlaceholderData } = useGetPaginatedPrintedIdsReport(
    date,
    Number(page) - 1,
    52
  );

  const pageNumbers = Math.ceil(data?.paginatedStudents.length / 26) || 0;
  const pageArray = Array(Number(pageNumbers))?.fill();

  return (
    <>
      <Card>
        <CardHeader className='space-y-0'>
          <CardTitle>Printed ID Transactions</CardTitle>
          <CardDescription>List of Printed ID per transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Print Type</TableHead>
                <TableHead>Printed Date</TableHead>
                <TableHead>Released Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.paginatedStudents.map((printInfo) => {
                return (
                  <TableRow key={printInfo.id}>
                    <TableCell className='font-medium'>
                      <div className='font-medium -mb-1'>
                        {`${printInfo.student.studentIdNumber} - ${printInfo.student.firstName} ${printInfo.student.middleInitial} ${printInfo.student.lastName}`}
                      </div>
                      <div className='hidden text-xs text-muted-foreground md:inline'>
                        {printInfo.student.program.programName}
                      </div>
                    </TableCell>

                    <TableCell className='font-medium'>
                      <div className='font-medium -mb-1'>
                        {printInfo.printType}
                      </div>
                      <div className='hidden text-xs text-muted-foreground md:inline'>
                        {printInfo.reprintReason || ''}
                      </div>
                    </TableCell>

                    <TableCell className='font-medium'>
                      <div className='font-medium -mb-1'>
                        {format(
                          new Date(printInfo.printedDate),
                          'MMM dd, yyyy'
                        )}
                      </div>
                      <div className='hidden text-xs text-muted-foreground md:inline'>
                        {printInfo.printedBy?.fullName || ''}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='font-medium -mb-1'>
                        {printInfo.releasedDate
                          ? format(
                              new Date(printInfo.releasedDate),
                              'MMM dd, yyyy'
                            )
                          : 'Not Release'}
                      </div>{' '}
                      <div className='hidden text-xs text-muted-foreground md:inline'>
                        {printInfo.releasedBy?.fullName || ''}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationBlock
            studentsCount={data?.studentsCount}
            totalStudents={data?.totalStudents}
            page={page}
            hasMore={data?.hasMore}
            onPageClick={onPageClick}
            isPlaceholderData={isPlaceholderData}
          />
        </CardFooter>
      </Card>

      <div className='bg-white p-1 print-report' ref={componentToPrintRef}>
        {pageArray?.map((_, index) => (
          <PrintReportBody
            key={index}
            componentToPrint
            index={index}
            printedLists={data?.paginatedStudents}
            date={date}
          />
        ))}
      </div>
    </>
  );
}
