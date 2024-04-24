import LoadingSpinner from '@/common/loading-spinner/LoadingSpinner';
import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import NoRecordsFound from '@/common/typography/NoRecordsFound';
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
import { useGetAllUsers } from '@/hooks/user.hook';

export default function UsersTable({
  currentUser,
  setModalSetting,
  setIsopen,
}) {
  const { isLoading, data: users } = useGetAllUsers(currentUser);

  const handleOptionsClick = (userData, isDeactivatedBtn) => {
    let modalData;

    if (isDeactivatedBtn) {
      modalData = {
        confirmation: 'delete-user',
        title: 'Update Info',
        size: 'max-w-2xl',
        modalType: 'add-user',
        payload: userData,
      };
    } else {
      modalData = {
        confirmation: null,
        title: 'Update Info',
        size: 'max-w-2xl',
        modalType: 'add-user',
        payload: userData,
      };
    }

    setModalSetting(modalData);
    setIsopen(true);
  };

  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.username}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'> {user.fullName}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.email}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.role}</div>
                  </TableCell>

                  <TableCell>
                    <div className='flex space-x-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleOptionsClick(user, false)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant={user.isActive ? 'secondary' : 'default'}
                        className='w-20'
                      >
                        {user.isActive ? 'Deactivate' : 'Active'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          users?.length === 0 && (
            <NoRecordsFound>No Records Found.</NoRecordsFound>
          )
        )}
      </CardContent>
      <CardFooter>
        <PaginationBlock />
      </CardFooter>
    </Card>
  );
}
