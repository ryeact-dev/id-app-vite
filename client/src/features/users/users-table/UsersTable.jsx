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

const DUMMY_DATA = [
  {
    id: '1',
    username: 'rmontoya',
    fullName: 'Ryan P. Montoya',
    email: 'test@gmail.com',
    role: 'Admin',
    createdBy: 'ShuperAhdmin',
    createdAt: 'Jan 09, 1990',
    isActive: true,
  },
  {
    id: '2',
    username: 'jcastro',
    fullName: 'Jolland H. Castro',
    email: 'test@gmail.com',
    role: 'Admin',
    createdBy: 'ShuperAhdmin',
    createdAt: 'Jan 09, 1990',
    isActive: false,
  },
  {
    id: '3',
    username: 'lJacobo',
    fullName: 'Luther Jacobo',
    email: 'test@gmail.com',
    role: 'Admin',
    createdBy: 'ShuperAhdmin',
    createdAt: 'Jan 09, 1990',
    isActive: true,
  },
];

export default function UsersTable() {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_DATA.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{user.username}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {user.fullName}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{user.email}</div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{user.role}</div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{user.createdAt}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {user.createdBy}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button size='sm' variant='outline'>
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant={user.isActive ? 'secondary' : 'default'}
                      className='w-20'
                    >
                      {user.isActive ? 'Deactivate' : 'Active'}
                    </Button>
                    {/* <Button size='sm'>Print</Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationBlock />
      </CardFooter>
    </Card>
  );
}
