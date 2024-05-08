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
import { Calendar, CalendarDays } from 'lucide-react';

export default function Semester() {
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
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium'>First Semester</div>
                <div className='text-xs text-muted-foreground'>
                  Aug 23, 2023 - Aug 30, 2023
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='secondary'>Active</Badge>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant='outline'>
                    <CalendarDays className='size-4 mr-1' /> Set Dates
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium'>Second Semester</div>
                <div className='text-xs text-muted-foreground'>
                  Aug 23, 2023 - Aug 30, 2023
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='outline'>Inactive</Badge>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant='outline'>
                    Set
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>
                <div className='font-medium'>Summer</div>
                <div className='text-xs text-muted-foreground'>
                  Dates not set
                </div>
              </TableCell>
              <TableCell>
                <Badge variant='outline'>Inactive</Badge>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant='outline'>
                    Set
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
