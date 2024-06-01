import { Button } from '@/common/ui/button';
import { Form } from '@/common/ui/form';
import { INITIAL_UPDATE_PASSWORD_OBJ } from '@/lib/globalConstants';
import { updateUserPasswordSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import PasswordInputs from './components/password-inputs/PasswordInputs';
import { useCurrentUser, useUpdateUserPassword } from '@/hooks/user.hook';

export default function UpdatePasswordModalBody({ payload, closeModal }) {
  const { data: currentUser } = useCurrentUser();
  const { mutate: handleUpdatePasswordMutation } =
    useUpdateUserPassword(closeModal);

  const form = useForm({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: INITIAL_UPDATE_PASSWORD_OBJ,
  });

  const onSubmit = (values) => {
    const forUpdatingData = {
      ...values,
      userId: currentUser.userInfo.id,
    };

    // console.log(forUpdatingData);
    handleUpdatePasswordMutation({ forUpdatingData });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PasswordInputs form={form} />

        <div className='flex flex-col sm:flex-row gap-4 md:mt-4 px-2'>
          <div className='flex-1' />
          <div className='flex-1 flex items-center gap-2'>
            <Button
              type='button'
              onClick={() => closeModal()}
              className='flex-1 border border-destructive hover:bg-destructive'
              variant='ghost'
            >
              <XCircle size={16} className='mr-1' /> Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-accent hover:bg-accent/90 px-4'
              //   disabled={onAddUserMutation.isPending}
            >
              <Send size={16} className='mr-1' />{' '}
              {/* {onAddUserMutation.isPending ? 'Submitting...' : 'Submit'} */}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
