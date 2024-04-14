import AddDepartmentModalBody from '@/common/modal/add-department/AddDepartmentModalBody';
import AddProgramModalBody from '@/common/modal/add-program/AddProgramModalBody';
import AddSchoolYearModalBody from '@/common/modal/add-school-year/AddSchoolYearModalBody';
import AddStudentModalBody from '@/common/modal/add-student/AddStudentModalBody';
import { Card } from '@/common/ui/card';
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
    default:
      modalComponent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={`${size} bg-background`}>
        <DialogHeader>
          <Card className='rounded-md'>
            <DialogTitle className='text-center text-2xl p-1'>
              {title}
            </DialogTitle>
          </Card>
        </DialogHeader>
        <div>{modalComponent}</div>
      </DialogContent>
    </Dialog>
  );
}
