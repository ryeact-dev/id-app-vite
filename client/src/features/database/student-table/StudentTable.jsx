import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

export default function StudentTable() {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Liam Johnson</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Morning</div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Aug 28, 2023
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Afternoon</div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Sep 09, 2023
                </div>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button size='sm' variant='outline'>
                    Edit
                  </Button>
                  {/* <Button size='sm'>Print</Button> */}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Liam Johnson</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Morning</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Aug 23, 2023
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Afternoon</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Aug 28, 2023
                </div>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button size='sm' variant='outline'>
                    Edit
                  </Button>
                  {/* <Button size='sm'>Print</Button> */}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationBlock />
      </CardFooter>
    </Card>
  );
}
