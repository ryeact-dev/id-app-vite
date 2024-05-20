import bgID from '@/assets/UMTC ID_2022_150dpi.png';
import umtcLogo from '@/assets/UMTC_LOGO.png';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-react-barcode-generator';

export default function FrontPage({ payload }) {
  return (
    <>
      <div className={`relative w-[320px] h-[508px]`}>
        {/* Background */}
        <img
          src={bgID}
          alt='umtc-id-background'
          className='absolute top-0 left-0 object-cover object-center w-full h-full -z-10'
        />
        {/* ID Details */}
        <div className='flex flex-col items-center'>
          <img
            src={umtcLogo}
            alt='umtc-logo'
            className='object-cover object-center mt-2'
          />

          <img
            src={import.meta.env.VITE_LOCAL_BASE_URL + payload?.photoUrl}
            alt='umtc-logo'
            className='object-cover object-center mt-2 size-40 border-2 border-red-600 '
          />

          <div className='flex items-center justify-center mt-1'>
            <div className='bg-white h-[55px]'>
              <BarcodeGeneratorComponent
                id='barcode'
                width={'160px'}
                height={'70px'}
                type='Code128'
                value={`S${payload?.studentIdNumber}`}
                //   displayText={{ text: ' ' }}
              ></BarcodeGeneratorComponent>
            </div>
          </div>

          {/* Student ID Number */}
          <div className='flex items-center justify-center text-lg font-extrabold tracking-tighter '>
            <p>ID No.: {payload?.studentIdNumber}</p>
          </div>

          {/* ID Title */}
          <div className='flex items-center justify-center text-lg text-white font-bold tracking-tight uppercase'>
            <p>Student</p>
          </div>

          {/* Student Last name */}
          <div className='flex items-center justify-center text-3xl font-extrabold uppercase -mt-0.5 px-2 h-10'>
            <p>{payload?.lastName}</p>
          </div>

          {/* Student First name and MI */}
          <div className='flex items-center justify-center text-xl font-extrabold uppercase -mt-1 px-2 h-10 '>
            <p className='text-center leading-5'>{`${payload?.firstName} ${payload?.middleInitial}`}</p>
          </div>

          {/* Validation Sticker */}
          <div className='flex items-center justify-center text-lg font-bold uppercase mt-4 opacity-80'>
            <p>Validation Sticker</p>
          </div>
        </div>
      </div>
    </>
  );
}
