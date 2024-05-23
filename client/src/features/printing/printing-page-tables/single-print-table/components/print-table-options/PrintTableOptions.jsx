import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import { Button } from '@/common/ui/button';
import ModalContainer from '@/containers/ModalContainer';
import { PenBox, Printer } from 'lucide-react';
import { useState } from 'react';

export default function PrintTableOptions({ student, activeSem, printInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const handleEditStudent = (studentData) => {
    const reMapStudentData = {
      ...studentData,
      // Convert to a date object because the date is coming in as a string
      birthDate: new Date(studentData?.birthDate),
    };

    const payload = studentData ? reMapStudentData : null;

    const modalData = {
      confirmationType: null,
      title: 'Student Details',
      size: 'max-w-2xl',
      modalType: 'add-student',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const onPrintStudentID = (student) => {
    const schoolYearId = activeSem.schoolYearId;
    const semesterId = activeSem.id;

    if (printInfo.printedDate && !printInfo.releasedDate) {
      return ToastNotification(
        'error',
        'Please release the student ID before re-printing'
      );
    }

    const payload = {
      student,
      releasedDate: printInfo?.releasedDate,
      printId: printInfo?.id,
      schoolYearId,
      semesterId,
    };

    const modalData = {
      confirmationType: null,
      title: 'Student ID Details',
      size: 'max-w-3xl',
      modalType: 'print-student-id',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <>
      <div className='flex space-x-2'>
        <Button
          size='sm'
          onClick={() => handleEditStudent(student)}
          variant='outline'
        >
          <PenBox className='size-4 mr-1' /> Edit
        </Button>
        <Button
          size='sm'
          className='w-24'
          onClick={() => onPrintStudentID(student)}
        >
          <Printer className='size-4 mr-1' />
          {printInfo?.printedDate ? 'Reprint' : 'Print'}
        </Button>
        <Button
          size='sm'
          disabled={printInfo?.releasedDate}
          variant='secondary'
        >
          Release
        </Button>
      </div>
      {/* Modal Container */}
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalSetting={modalSetting}
        />
      )}
    </>
  );
}
