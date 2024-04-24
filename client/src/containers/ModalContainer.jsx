import AddDepartmentModalBody from '@/common/modal/add-department/AddDepartmentModalBody';
import AddProgramModalBody from '@/common/modal/add-program/AddProgramModalBody';
import AddSchoolYearModalBody from '@/common/modal/add-school-year/AddSchoolYearModalBody';
import AddStudentModalBody from '@/common/modal/add-student/AddStudentModalBody';
import AddUserModalBody from '@/common/modal/add-user/AddUserModalBody';
import ConfirmationModalBody from '@/common/modal/confirmation/ConfirmationModalBody';
import { Card } from '@/common/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/common/ui/dialog';
import { useEffect, useState } from 'react';

export default function ModalContainer({ isOpen, setIsOpen, modalSetting }) {
  const { modalType, title, size, payload, confirmationType } = modalSetting;

  const [isMounted, setIsMounted] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  // Check if component is mounted to avoid hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let modalComponent = <div></div>;

  switch (modalType) {
    case 'add-student':
      modalComponent = (
        <AddStudentModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'add-school-year':
      modalComponent = (
        <AddSchoolYearModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'add-department':
      modalComponent = (
        <AddDepartmentModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'add-program':
      modalComponent = (
        <AddProgramModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'add-user':
      modalComponent = (
        <AddUserModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'confirmation':
      modalComponent = (
        <ConfirmationModalBody
          title={title}
          payload={payload}
          closeModal={close}
          confirmationType={confirmationType}
        />
      );
      break;
    default:
      modalComponent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={`${size}`}>
        <DialogHeader>
          <Card
            className={`rounded-md ${
              modalType === 'confirmation' &&
              'shadow-none bg-transparent border-none'
            } `}
          >
            <DialogTitle className='text-center text-2xl p-1'>
              {modalType === 'confirmation' ? 'Confirmation' : title}
            </DialogTitle>
          </Card>
        </DialogHeader>
        <div>{modalComponent}</div>
      </DialogContent>
    </Dialog>
  );
}
