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
import { useGetAllUsers, useToggleUserStatus } from '@/hooks/user.hook';
import { PenBox, Trash } from 'lucide-react';

export default function UsersTable({
  currentUser,
  setModalSetting,
  setIsOpen,
  fullName,
}) {
  const { isLoading, data: users } = useGetAllUsers(currentUser, fullName);

  const onToggleUserStatusMutation = useToggleUserStatus();

  const handleOptionsClick = (userData, removeUser) => {
    let modalData;

    if (removeUser) {
      const title = `remove ${userData.username}'s account?`;
      modalData = {
        confirmationType: 'delete-user',
        title,
        size: 'max-w-md',
        modalType: 'confirmation',
        payload: userData.id,
      };
    } else {
      modalData = {
        confirmationType: null,
        title: 'Update Info',
        size: 'max-w-2xl',
        modalType: 'add-user',
        payload: userData,
      };
    }

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleToggleUserStatus = (userId, userStatus) => {
    const isActive = userStatus === true ? false : true;

    const forUpdatingData = {
      id: userId,
      isActive,
    };

    onToggleUserStatusMutation.mutate({ forUpdatingData });
  };

  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
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
                    <div className='font-medium -mb-1 capitalize'>
                      {user.fullName}
                    </div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.username}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.email}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='font-medium -mb-1'>{user.role}</div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    {currentUser.id !== user.id && (
                      <Badge
                        className={`${
                          user.isActive
                            ? 'bg-green-500 hover:bg-green-700'
                            : 'bg-gray-700 hover:bg-gray-500'
                        } w-20 justify-center `}
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.isActive)
                        }
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className='flex space-x-2'>
                      {currentUser.id !== user.id && (
                        <>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleOptionsClick(user, false)}
                          >
                            <PenBox size={14} className='mr-1' />
                            Edit
                          </Button>
                          <Button
                            size='sm'
                            variant={'secondary'}
                            className='w-20'
                            onClick={() => handleOptionsClick(user, true)}
                          >
                            <Trash size={14} className='mr-1' /> Delete
                          </Button>
                        </>
                      )}
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
