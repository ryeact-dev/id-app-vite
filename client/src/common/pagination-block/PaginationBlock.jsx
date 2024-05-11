import { Button } from '../ui/button';
import { Pagination, PaginationContent } from '../ui/pagination';

export default function PaginationBlock({ studentsCount, totalStudents }) {
  return (
    <Pagination className='flex items-center justify-between'>
      <div className='text-xs text-muted-foreground'>
        Showing <strong>{studentsCount}</strong> of{' '}
        <strong>{totalStudents}</strong> students
      </div>
      <PaginationContent>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            // onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
