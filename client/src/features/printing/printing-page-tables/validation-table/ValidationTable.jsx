import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import { useGetPaginatedValidations } from '@/hooks/idValidation.hook';
import { format } from 'date-fns';

import { CheckCircle, Search } from 'lucide-react';

export default function ValidationTable({
  setModalSetting,
  setIsOpen,
  activeSem,
  page,
  onPageClick,
}) {
  // TODO: ADD SCHOOL YEAR AND SEMESTER TO ONLY SHOW VALIDATIONS FOR THE ACTIVE SCHOOL YEAR AND SEMESTER
  const { data: validationTransactions, isPlaceholderData } =
    useGetPaginatedValidations('', Number(page - 1), 10);

  const handleValidateID = () => {
    const modalData = {
      confirmationType: null,
      title: 'Validate Student ID',
      size: 'max-w-xl',
      modalType: 'validate-student-id',
      payload: activeSem,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <Card>
      <div className='flex items-center justify-between gap-4'>
        <CardHeader className='space-y-0'>
          <CardTitle>ID Validation Transactions</CardTitle>
          <CardDescription>
            List of ID Validations per transaction
          </CardDescription>
        </CardHeader>
        <div className='m-4 flex items-center gap-2'>
          {/* <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search ID number...'
              className='pl-8 sm:w-[200px]'
            />
          </div> */}
          <Button
            type='button'
            className='font-semibold px-6'
            onClick={handleValidateID}
          >
            <CheckCircle className='mr-2 h-4 w-4' /> Validate ID
          </Button>
        </div>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Validated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validationTransactions?.paginatedValidations?.map(
              (validationInfo) => (
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
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationBlock
          studentsCount={validationTransactions?.validationsCount}
          totalStudents={validationTransactions?.totalValidations}
          page={page}
          hasMore={validationTransactions?.hasMore}
          onPageClick={onPageClick}
          isPlaceholderData={isPlaceholderData}
        />
      </CardFooter>
    </Card>
  );
}
