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

export default function PrintManyTable() {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Printed Date</TableHead>
              <TableHead>Printed By</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  14748 - Printed and Release
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='secondary'>Released</Badge>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Aug 28, 2023</div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  Reprint
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
                  <Button size='sm' className='w-16'>
                    Reprint
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  14748 - Printed but not yet release
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='outline'>Not release</Badge>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>Aug 23, 2023</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  New ID
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
                  <Button size='sm' className='w-16'>
                    Reprint
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  14748 - I am not Printed Yet
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  BS - Tourism Management
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='outline'>Not release</Badge>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>N/A</div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>N/A</div>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button size='sm' variant='outline'>
                    Edit
                  </Button>
                  <Button size='sm' className='w-16'>
                    Print
                  </Button>
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
