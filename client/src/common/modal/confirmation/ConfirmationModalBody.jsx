import { Button } from '@/common/ui/button';
import { useDeleteDepartment } from '@/hooks/department.hook';
import { useDeletePrintTransaction, useReleaseId } from '@/hooks/printing.hook';
import { useDeleteProgram } from '@/hooks/program.hook';
import { useDeleteSchoolYear } from '@/hooks/schoolyear.hook';
import { useDeleteUser, useLogoutUser } from '@/hooks/user.hook';
import { Send, XCircle } from 'lucide-react';

export default function ConfirmationModalBody({
  title,
  payload,
  closeModal,
  confirmationType,
}) {
  let isLoading;

  // Mutations
  const handleDeleteUserMutation = useDeleteUser(closeModal);
  const handleDeleteDepartmentMutation = useDeleteDepartment(closeModal);
  const handleDeleteProgramMutation = useDeleteProgram(closeModal);
  const handleDeleteSchoolYearMutation = useDeleteSchoolYear(closeModal);
  const handleReleaseIdMutation = useReleaseId(closeModal);
  const handleDeletePrintTransactionMutation =
    useDeletePrintTransaction(closeModal);
  const handleLogoutUserMutation = useLogoutUser(closeModal);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    switch (confirmationType) {
      case 'delete-user':
        handleDeleteUserMutation.mutate({ userId: payload });
        isLoading = handleDeleteUserMutation.isPending;
        break;
      case 'delete-department':
        handleDeleteDepartmentMutation.mutate({ id: payload });
        isLoading = handleDeleteDepartmentMutation.isPending;
        break;
      case 'delete-program':
        handleDeleteProgramMutation.mutate({ id: payload });
        isLoading = handleDeleteProgramMutation.isPending;
        break;
      case 'delete-school-year':
        handleDeleteSchoolYearMutation.mutate({ id: payload });
        isLoading = handleDeleteSchoolYearMutation.isPending;
        break;
      case 'delete-print-transaction':
        handleDeletePrintTransactionMutation.mutate({ printId: payload });
        isLoading = handleDeletePrintTransactionMutation.isPending;
        break;
      case 'release-id':
        handleReleaseIdMutation.mutate({ printId: payload });
        isLoading = handleReleaseIdMutation.isPending;
        break;
      case 'logout-user':
        handleLogoutUserMutation.mutate({ printId: payload });
        isLoading = handleLogoutUserMutation.isPending;
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold text-center'>{title}</h2>
      <div className='flex items-center justify-end gap-2 mt-6'>
        <Button
          type='button'
          className='border border-destructive hover:bg-destructive text-destructive'
          variant='ghost'
          onClick={() => closeModal()}
        >
          <XCircle size={18} className='mr-1' /> Cancel
        </Button>
        <Button type='submit' className='w-40' disabled={isLoading}>
          <Send size={18} className='mr-1' />{' '}
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
