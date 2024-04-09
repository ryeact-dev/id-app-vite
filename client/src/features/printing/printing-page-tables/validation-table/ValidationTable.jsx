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

export default function ValidationTable() {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Validated Date</TableHead>
              <TableHead>Validated By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  14748 - Lost ID and Revalidated
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Aug 28, 2023</div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Revalidated
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Afternoon</div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Sep 09, 2023
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>14748 - Just Validated</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Aug 23, 2023</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Validated
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Stap Afternoon</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Aug 28, 2023
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
