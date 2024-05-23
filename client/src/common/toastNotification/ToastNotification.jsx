import { toast } from 'sonner';

export const ToastNotification = (toastType, message) => {
  const toastMessage = <span className='leading-4'>{message}</span>;

  switch (toastType) {
    case 'success':
      return toast.success(toastMessage, {
        style: {
          background: 'rgba( 26, 178, 26, 0.8)',
          borderStyle: 'solid',
          borderColor: '#1AB21A',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'error':
      return toast.error(toastMessage, {
        style: {
          background: 'rgba( 255, 52, 52, 0.8)',
          borderStyle: 'solid',
          borderColor: '#FF3434',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'info':
      return toast.info(toastMessage, {
        style: {
          background: 'rgba( 25, 96, 170, 0.8)',
          borderStyle: 'solid',
          borderColor: '#1960AA',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'warning':
      return toast.warning(toastMessage, {
        style: {
          background: 'rgba( 255, 238, 50, 0.8)',
          borderStyle: 'solid',
          borderColor: '#ffee32',
          borderWidth: '2px',
          color: 'black',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    default:
      return;
  }
};
