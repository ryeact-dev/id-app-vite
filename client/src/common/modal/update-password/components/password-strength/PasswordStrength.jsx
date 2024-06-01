import { cn } from '@/lib/utils/twMerge';

export default function PasswordStrength({ newPassword }) {
  const indicatorMap = [
    { strength: 'Weak', className: 'before:w-[30%] before:bg-secondary' },
    { strength: 'Medium', className: 'before:w-[65%] before:bg-primary' },
    { strength: 'Strong', className: 'before:w-[100%] before:bg-green-500' },
  ];

  const passLength = newPassword.length;
  const className =
    passLength <= 8
      ? indicatorMap[0]
      : passLength <= 15
      ? indicatorMap[1]
      : indicatorMap[2];

  const textColor =
    className.strength === 'Weak'
      ? 'text-secondary'
      : className.strength === 'Medium'
      ? 'text-primary'
      : 'text-green-500';

  return (
    <div className='flex items-center justify-center gap-2 px-2 w-full'>
      <div className={`text-sm text-center w-16 ${textColor}`}>
        {className.strength || 'Weak'}
      </div>
      <div
        className={cn(
          'w-full h-3 relative bg-grey-600 rounded-3xl pass-indicator ',
          className.className
        )}
      ></div>
    </div>
  );
}
