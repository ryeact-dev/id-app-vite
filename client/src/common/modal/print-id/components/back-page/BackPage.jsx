import { format } from 'date-fns';
import registrarEsign from '@/assets/registrar_esign.png';

export default function BackPage({ payload }) {
  return (
    <div
      className={`print-card relative w-[300px] h-[473px] bg-white rounded-md overflow-hidden shadow-lg p-1`}
    >
      {/* Student Department */}
      <div className='flex items-center justify-center border-2 border-black w-full h-10 rounded-sm'>
        <p className='text-center leading-4 p-1 text-sm font-bold'>
          {payload?.program.department.departmentName || ''}
        </p>
      </div>

      {/* Student Birthday */}
      <div className='flex items-center justify-center border-2 border-black mt-1 w-full h-8 rounded-sm'>
        <p className='text-center leading-4 p-2 text-sm font-bold'>
          Birthday: {format(new Date(payload?.birthDate), 'MMM dd, yyyy') || ''}
        </p>
      </div>

      {/* ID Notice */}
      <div className='flex flex-col items-center justify-center mt-1 w-full text-justify uppercase font-semibold text-[11px] '>
        <p className='leading-3 p-2 '>
          this card is non-transferable and valid only for the semester last
          validated. it must be worn within the premises at all times.
        </p>
        <p className='leading-3 p-2 -mt-1'>
          incase of loss, finder is requested to surrender the card to the
          student affairs office of um tagum college, tagum city
        </p>
      </div>

      {/* University Registrar */}
      <div className='flex flex-col items-center justify-center mt-1 w-full text-justify font-semibold '>
        <img
          src={registrarEsign}
          alt='registrar-esign'
          className='object-contain object-center w-full h-8 -mb-4 '
        />
        <p className='leading-3 p-2'>Juanito Villasencio</p>
        <p className='w-[80%] border-b-2 border-black -mb-2 -mt-1'></p>
        <p className='leading-3 text-xs p-2'>University Registrar</p>
      </div>

      {/* Incase of Emergency */}
      <div className='relative flex flex-col mt-1 w-full h-36 border-2 border-black rounded-sm '>
        <div className='absolute top-0 left-0 object-cover object-center w-full h-6 bg-black'>
          <p className='uppercase text-white text-center text-sm'>
            Incase of Emergency
          </p>
        </div>
        <div className='mt-6 font-medium text-sm'>
          <p className='leading-5 p-2 font-bold'>{payload?.guardian}</p>
          <p className='p-2 -my-4'>{payload?.guardianContact}</p>
          <p className='leading-5 p-2'>{payload?.address}</p>
        </div>
      </div>

      {/* Student Signature */}
      <div className='flex flex-col items-center justify-center mt-2 w-full text-justify font-semibold'>
        <img
          src={import.meta.env.VITE_LOCAL_BASE_URL + payload?.esignUrl}
          alt='student-esign'
          className='object-contain object-center w-full h-14'
        />

        <p className='w-[80%] border-b-2 border-black -my-2'></p>
        <p className='leading-3 text-xs p-2'>Student Signature</p>
      </div>
    </div>
  );
}
