import { ImageComponent } from '@/common/image-component/ImageComponent';
import { Card, CardHeader, CardTitle } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import { UploadCloud } from 'lucide-react';

export default function StudentImageInputs({
  photo,
  esign,
  setPhoto,
  setEsign,
}) {
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleEsignChange = (event) => {
    const file = event.target.files[0];
    setEsign(file);
  };

  return (
    <div className='flex-1 space-y-2 flex flex-col items-center'>
      {/* Student Photo */}
      <Card className='overflow-hidden rounded-md'>
        <CardHeader className='p-0'>
          <CardTitle className='p-2'>Photo</CardTitle>
        </CardHeader>
        <div className='relative rounded-md size-48 flex items-center justify-center m-1 border border-dashed'>
          <ImageComponent
            alt='StudentPhoto'
            className='object-contain object-center h-full w-full'
            src={photo}
          />

          <label className='rounded-md size-18 absolute bottom-2 right-2 bg-accent text-white p-2 hover:cursor-pointer hover:opacity-90'>
            <Input
              type='file'
              accept='image/jpeg, image/jpg, image/webp, image/png'
              className='hidden'
              onChange={handlePhotoChange}
            />
            <p className='flex items-center justify-center'>
              <UploadCloud className='size-18' strokeWidth={2} />
            </p>
          </label>
        </div>
      </Card>

      {/* Student Esign */}
      <Card className='overflow-hidden rounded-md'>
        <CardHeader className='p-0'>
          <CardTitle className='p-2'>Signature</CardTitle>
        </CardHeader>
        <div className='relative rounded-md size-48 flex items-center justify-center m-1 border border-dashed'>
          <ImageComponent
            alt='ESignature'
            className='object-contain object-center h-full w-full'
            src={esign}
          />
          <label className='rounded-md size-18 absolute bottom-2 right-2 bg-accent text-white p-2 hover:cursor-pointer hover:opacity-90'>
            <Input
              type='file'
              accept='image/jpeg, image/jpg, image/webp, image/png'
              className='hidden'
              onChange={handleEsignChange}
            />
            <p className='flex items-center justify-center'>
              <UploadCloud className='size-18' strokeWidth={2} />
            </p>
          </label>
        </div>
      </Card>
    </div>
  );
}
