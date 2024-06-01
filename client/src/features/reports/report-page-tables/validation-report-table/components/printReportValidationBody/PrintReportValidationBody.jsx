import { format } from 'date-fns';
import umtcLogo from '@/assets/UMTC_LOGO.png';

export default function PrintReportValidationBody({ validatedList, date }) {
  while (validatedList?.length < 26) {
    validatedList.push({
      id: null,
    });
  }

  return (
    <div className='break-before-page'>
      {/* Page Header */}
      <div className='grid grid-cols-2 border-2 border-gray-950 divide-x-2 divide-gray-950 mt-4 mb-2 h-16'>
        <div className='pl-1 pt-3 flex items-center h-10'>
          <img src={umtcLogo} className='h-10 mr-1' />
          <h2 className='font-bold text-2xl'>UM Tagum College</h2>
        </div>

        <div className='pl-1 pt-1.5'>
          <p className='font-bold'>List of Validated ID</p>
          <p className='-mt-2'>
            {format(new Date(date.from), 'MMM dd, yyyy')} -{' '}
            {format(new Date(date.to), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <div className='border border-gray-950 '>
        {/* Table Header */}
        <div className='grid grid-cols-3  divide-x divide-gray-950 font-bold '>
          <div className='col-span-2 pl-1 flex items-center h-10'>Name</div>
          <div className='pl-1 h-10 flex items-center'>Date Validated</div>
        </div>

        {/* List of Students */}
        {validatedList?.map((validationInfo, index) => (
          <div
            key={index}
            className='grid grid-cols-3 border-t border-gray-950  divide-x divide-gray-950 h-10'
          >
            <div className=' col-span-2 font-medium pl-1'>
              <div className='-mb-1 font-semibold'>
                {validationInfo.id &&
                  `${validationInfo.student?.studentIdNumber} - ${validationInfo.student?.firstName} ${validationInfo.student?.middleInitial} ${validationInfo.student?.lastName}`}
              </div>
              <div className='hidden text-xs text-muted-foreground md:inline'>
                {validationInfo.student?.program.programName}
              </div>
            </div>

            <div className='font-medium pl-1'>
              <div className='-mb-1'>
                {validationInfo.id &&
                  format(
                    new Date(validationInfo.dateValidated),
                    'MMM dd, yyyy'
                  )}
              </div>
              <div className='hidden text-xs text-muted-foreground md:inline'>
                {validationInfo.user?.fullName || ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className='grid grid-cols-2 border-2 border-gray-950 divide-x-2 divide-gray-950 mt-2 h-24'>
        <div className='pl-1'>
          <p>Prepared By:</p>
          <p>esign</p>
          <p>Personnel Name</p>
        </div>
        <div className='pl-1'>
          <p>Noted By:</p>
          <p>esign</p>
          <p>Personnel Name</p>
        </div>
      </div>
    </div>
  );
}
