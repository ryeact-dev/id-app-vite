import AddDepartmentModalBody from '@/common/modal/add-department/AddDepartmentModalBody';
import AddStudentModalBody from '@/common/modal/add-student/AddStudentModalBody';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/common/ui/dialog';
import { useEffect, useState } from 'react';

export default function ModalContainer({
  isOpen,
  setIsOpen,
  modalType,
  title,
  size,
  payload,
}) {
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
    // case 'add-school-year':
    //   modalComponent = (
    //     <AddSchoolYearModalBody payload={payload} closeModal={close} />
    //   );
    //   break;
    case 'add-department':
      modalComponent = (
        <AddDepartmentModalBody payload={payload} closeModal={close} />
      );
      break;
    // case 'add-program':
    //   modalComponent = (
    //     <AddProgramModalBody payload={payload} closeModal={close} />
    //   );
    //   break;
    default:
      modalComponent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={`${size}`}>
        <DialogHeader>
          <DialogTitle className='text-center'>{title}</DialogTitle>
        </DialogHeader>
        <div className='my-4'>{modalComponent}</div>
      </DialogContent>
    </Dialog>
  );
}
