import { toast } from 'sonner';

export const ToastNotification = (toastType, message) => {
  switch (toastType) {
    case 'success':
      return toast.success(message, {
        style: {
          background: '#1AB21A',
          borderStyle: 'solid',
          borderColor: '#007200',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'error':
      return toast.error(message, {
        style: {
          background: '#FF3434',
          borderStyle: 'solid',
          borderColor: '#C50000',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'info':
      return toast.info(message, {
        style: {
          background: '#1960AA',
          borderStyle: 'solid',
          borderColor: '#023e7d',
          borderWidth: '2px',
          color: 'white',
          height: '60px',
          fontSize: '14px',
        },
        className: 'class',
        duration: 3000,
      });
    case 'warning':
      return toast.warning(message, {
        style: {
          background: '#ffee32',
          borderStyle: 'solid',
          borderColor: '#FFD632',
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
