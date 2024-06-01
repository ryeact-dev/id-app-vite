import { Button } from '../ui/button';
import { Pagination, PaginationContent } from '../ui/pagination';

export default function PaginationBlock({
  studentsCount,
  totalStudents,
  page,
  hasMore,
  onPageClick,
  isPlaceholderData,
}) {
  return (
    <Pagination className='flex items-center justify-end gap-4'>
      <div className='text-xs text-muted-foreground'>
        Showing <strong>{studentsCount}</strong> of{' '}
        <strong>{totalStudents}</strong> students
      </div>
      <PaginationContent>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              const oldPage = Math.max(Number(page) - 1, 0);
              onPageClick(oldPage);
            }}
            disabled={Number(page) === 1}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              if (!isPlaceholderData && hasMore) {
                const nextPage = Number(page) + 1;
                onPageClick(nextPage);
              }
            }}
            disabled={isPlaceholderData || !hasMore}
          >
            Next
          </Button>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
