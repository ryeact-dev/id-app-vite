import { Button } from '../ui/button';
import { Pagination, PaginationContent } from '../ui/pagination';

export default function PaginationBlock() {
  return (
    <Pagination className='flex items-center justify-between'>
      <div className='text-xs text-muted-foreground'>
        Showing <strong>1-10</strong> of <strong>32</strong> products
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
