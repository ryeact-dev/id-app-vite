import { format } from 'date-fns';

export default function PrintReportPrintedStudents({ listOfStudents }) {
  while (listOfStudents?.length < 26) {
    listOfStudents.push({
      id: null,
    });
  }

  return listOfStudents?.map((printInfo, index) => (
    <div
      key={index}
      className='grid grid-cols-5 border-t border-gray-950  divide-x divide-gray-950'
    >
      <div className='font-medium col-span-2 pl-1 h-10'>
        <div className='-mb-2'>
          {printInfo.id &&
            `${printInfo.student.studentIdNumber} - ${printInfo.student.firstName} ${printInfo.student.middleInitial} ${printInfo.student.lastName}`}
        </div>
        <div className='hidden text-xs text-muted-foreground md:inline'>
          {printInfo.id && printInfo.student.program.programName}
        </div>
      </div>

      <div className='font-medium pl-1'>
        <div className='-mb-2'>{printInfo.printType || ''}</div>
        <div className='hidden text-xs text-muted-foreground md:inline'>
          {printInfo.reprintReason || ''}
        </div>
      </div>

      <div className='font-medium pl-1'>
        {printInfo.id && (
          <>
            <div className='-mb-2'>
              {printInfo.releasedDate
                ? format(new Date(printInfo.releasedDate), 'MMM dd, yyyy')
                : 'Not Release'}
            </div>
            <div className='hidden text-xs text-muted-foreground md:inline'>
              {printInfo.releasedBy?.fullName || ''}
            </div>
          </>
        )}
      </div>
      <div className='font-medium pl-1'>
        {printInfo.id && (
          <div className='h-10 p-1'>
            {printInfo.releasedDate ? (
              printInfo.student.esignUrl !== 'null' ? (
                <img
                  src={
                    import.meta.env.VITE_LOCAL_BASE_URL +
                    printInfo.student.esignUrl
                  }
                  className='h-full w-32 object-contain object-center mix-blend-darken'
                />
              ) : (
                'No Signature'
              )
            ) : (
              '-'
            )}
          </div>
        )}
      </div>
    </div>
  ));
}
