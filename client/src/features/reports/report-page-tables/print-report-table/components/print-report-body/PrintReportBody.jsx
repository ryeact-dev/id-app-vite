import { format } from 'date-fns';
import umtcLogo from '@/assets/UMTC_LOGO.png';

import PrintReportPrintedStudents from '../printReportPrintedStudents/PrintReportPrintedStudents';

export default function PrintReportBody({ printedLists, index, date }) {
  // let start = 0;
  // let end = 25;

  // if (index > 0) {
  //   start = end + 1;
  //   end = end * (index + 1) + 1;
  // }

  return (
    <div className='break-before-page'>
      {/* Page Header */}
      <div className='grid grid-cols-2 border-2 border-gray-950 divide-x-2 divide-gray-950 mt-4 mb-2 h-16'>
        <div className='pl-1 pt-3 flex items-center h-10'>
          <img src={umtcLogo} className='h-10 mr-1' />
          <h2 className='font-bold text-2xl'>UM Tagum College</h2>
        </div>

        <div className='pl-1 pt-1.5'>
          <p className='font-bold'>List of Printed ID</p>
          <p className='-mt-2'>
            {format(new Date(date.from), 'MMM dd, yyyy')} -{' '}
            {format(new Date(date.to), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <div className='border border-gray-950 '>
        {/* Table Header */}
        <div className='grid grid-cols-5  divide-x divide-gray-950 font-bold '>
          <div className='col-span-2 pl-1 flex items-center h-10'>Name</div>
          <div className='pl-1 h-10 flex items-center'>Print Type</div>
          <div className='pl-1 h-10 flex items-center'>Released Date</div>
          <div className='pl-1 h-10 flex items-center'>Signature</div>
        </div>

        {/* List of Students */}
        <PrintReportPrintedStudents listOfStudents={printedLists} />
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
