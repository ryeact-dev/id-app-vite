import { Button } from '@/common/ui/button';
import { useDeleteUser } from '@/hooks/user.hook';
import { Send, XCircle } from 'lucide-react';

export default function ConfirmationModalBody({
  title,
  payload,
  closeModal,
  confirmationType,
}) {
  let isLoading;

  // Mutations
  const onUserDeleteMutation = useDeleteUser(closeModal);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    switch (confirmationType) {
      case 'delete-user':
        onUserDeleteMutation.mutate({ userId: payload });
        isLoading = onUserDeleteMutation.isPending;
        break;
      // case 'delete-question':
      //   useDeleteQuestionMutation.mutate({ questionId: payload });
      //   isLoading = useDeleteQuestionMutation.isPending;
      //   break;
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
