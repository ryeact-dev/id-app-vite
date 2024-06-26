import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoginInputForm from '@/features/login/login-input-form/LoginInputForm';
import { loginSchema } from '@/lib/schema';
import { INITIAL_LOGIN_OBJ } from '@/lib/globalConstants';
import { useLoginUser } from '@/hooks/user.hook';

export function LoginPage() {
  const onLoginUserMutation = useLoginUser();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_OBJ,
  });

  const onSubmit = (values) => {
    onLoginUserMutation.mutate({ forLoginData: values });
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center max-w-4xl'>
        <div className='w-full rounded-md overflow-hidden lg:grid lg:min-h-[400px] lg:grid-cols-2 xl:min-h-[600px] shadow-slate-500'>
          <div className='flex items-center justify-center py-12 bg-card px-4'>
            <div className='mx-auto grid max-w-[350px] gap-6'>
              <div className='grid gap-2 text-center'>
                <h1 className='text-3xl font-bold'>Welcome Back 👋</h1>
                <p className='text-balance text-muted-foreground'>
                  Enter your credentials below to login to your account
                </p>
              </div>
              <LoginInputForm
                form={form}
                onSubmit={onSubmit}
                isPending={onLoginUserMutation.isPending}
              />
            </div>
          </div>
          <div className='hidden bg-muted lg:block'>
            <img
              src='/placeholder.svg'
              alt='Image'
              width='1920'
              height='1080'
              className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
