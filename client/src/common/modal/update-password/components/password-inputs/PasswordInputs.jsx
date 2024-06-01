import { Card, CardContent } from '@/common/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { PASSWORD_REQUIREMENTS } from '@/lib/globalConstants';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const iconClass =
  'w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer';

export default function PasswordInputs({ form }) {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [requirements, setRequirements] = useState(PASSWORD_REQUIREMENTS);

  useEffect(() => {
    setRequirements(
      requirements.map((req) => ({
        ...req,
        met: req.regex.test(form.watch('newPassword')),
      }))
    );
  }, [form.watch('newPassword')]);

  const handleShowPassword = (type) => {
    switch (type) {
      case 'currentPassword':
        setShowPassword({
          ...showPassword,
          currentPassword: !showPassword.currentPassword,
        });
        break;
      case 'newPassword':
        setShowPassword({
          ...showPassword,
          newPassword: !showPassword.newPassword,
        });
        break;
      case 'confirmPassword':
        setShowPassword({
          ...showPassword,
          confirmPassword: !showPassword.confirmPassword,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex flex-col sm:flex-row w-full gap-3'>
      <Card className='w-full'>
        <CardContent className='space-y-3 mt-4'>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Currenr Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    {showPassword.currentPassword ? (
                      <Eye
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('currentPassword')}
                      />
                    ) : (
                      <EyeOff
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('currentPassword')}
                      />
                    )}
                    <Input
                      placeholder='Curret Password...'
                      {...field}
                      type={showPassword.currentPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    {showPassword.newPassword ? (
                      <Eye
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('newPassword')}
                      />
                    ) : (
                      <EyeOff
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('newPassword')}
                      />
                    )}
                    <Input
                      placeholder='New Password...'
                      {...field}
                      type={showPassword.newPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <ul className='-mt-1 px-1'>
            {requirements.map((req) => (
              <li
                key={req.id}
                className={`text-sm 
         ${req.met ? 'text-green-700 line-through' : 'text-primary'}`}
              >
                {req.text}
              </li>
            ))}
          </ul>

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='space-y-0 flex-1'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    {showPassword.confirmPassword ? (
                      <Eye
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('confirmPassword')}
                      />
                    ) : (
                      <EyeOff
                        color='#b1a7a6'
                        size={20}
                        className={iconClass}
                        onClick={() => handleShowPassword('confirmPassword')}
                      />
                    )}
                    <Input
                      placeholder='Confirm Password...'
                      {...field}
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
