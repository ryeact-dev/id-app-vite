import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/ui/button';
import { Form } from '@/common/ui/form';
import { INITIAL_USER_OBJ } from '@/lib/globalConstants';
import { userSchema } from '@/lib/schema';
import AddUserInputs from './components/add-user-inputs/AddUserInputs';
import { useAddUser } from '@/hooks/user.hook';

export default function AddUserModalBody({ payload, closeModal }) {
  const onAddUserMutation = useAddUser(closeModal);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: payload !== null ? payload : INITIAL_USER_OBJ,
  });

  const onSubmit = (values) => {
    let forAddingData;
    forAddingData = {
      ...values,
    };

    onAddUserMutation.mutate({ forAddingData });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:flex-row w-full gap-3'>
          <AddUserInputs form={form} />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 md:mt-4 px-2'>
          <div className='flex-1' />
          <div className='flex-1 flex items-center gap-2'>
            <Button
              type='button'
              onClick={() => closeModal()}
              className='flex-1 border border-destructive hover:bg-destructive'
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-accent hover:bg-accent/90'
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
