import { ToastNotification } from "@/common/toastNotification/ToastNotification";
import { Button } from "@/common/ui/button";

export default function PrintTableOptions({
  student,
  activeSem,
  printInfo,
  setIsOpen,
  setModalSetting,
}) {
  const handleEditStudent = () => {
    const reMapStudentData = {
      ...student,
      // Convert to a date object because the date is coming in as a string
      birthDate: new Date(student?.birthDate),
    };

    const payload = student ? reMapStudentData : null;

    const modalData = {
      confirmationType: null,
      title: "Student Details",
      size: "max-w-2xl",
      modalType: "add-student",
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handlePrintStudentID = () => {
    const schoolYearId = activeSem.schoolYearId;
    const semesterId = activeSem.id;

    // if (printInfo.printedDate && !printInfo.releasedDate) {
    //   return ToastNotification(
    //     'error',
    //     'Please release the student ID before re-printing'
    //   );
    // }

    const payload = {
      student,
      releasedDate: printInfo?.releasedDate,
      printId: printInfo?.id,
      schoolYearId,
      semesterId,
    };

    const modalData = {
      confirmationType: null,
      title: "Student ID Details",
      size: "max-w-3xl",
      modalType: "print-student-id",
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleReleaseID = () => {
    if (!printInfo?.printedDate) {
      return ToastNotification(
        "error",
        "Please print the student ID before releasing",
      );
    }

    const title = `Release ${student?.firstName} ${student?.lastName}'s ID?`;

    const modalData = {
      confirmationType: "release-id",
      title,
      size: "max-w-md",
      modalType: "confirmation",
      payload: printInfo?.id,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleDeletePrintedRecord = () => {
    const title = `Delete ${student?.firstName} ${student?.lastName}'s printed transaction?`;

    const modalData = {
      confirmationType: "delete-print-transaction",
      title,
      size: "max-w-md",
      modalType: "confirmation",
      payload: printInfo?.id,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <div className="flex w-60 shrink-0 space-x-2">
      {/* <Button size='sm' onClick={handleEditStudent} variant='outline'>
          <PenBox className='size-4 mr-1' /> Edit
        </Button> */}
      <Button
        size="sm"
        className="w-20 bg-blue-500 text-white hover:bg-blue-500/90"
        onClick={handlePrintStudentID}
      >
        {/* <Printer className='size-4 mr-1' /> */}
        {printInfo?.printedDate ? "Reprint" : "Print"}
      </Button>
      <Button
        size="sm"
        disabled={printInfo?.releasedDate}
        className={"w-24 bg-green-500 text-white hover:bg-green-500/90"}
        onClick={handleReleaseID}
      >
        {printInfo?.releasedDate ? "Released" : "Release"}
      </Button>

      <Button
        size="sm"
        className={"px-4"}
        disabled={printInfo?.releasedDate || printInfo.printType === "New ID"}
        onClick={handleDeletePrintedRecord}
      >
        Delete
      </Button>
    </div>
  );
}
