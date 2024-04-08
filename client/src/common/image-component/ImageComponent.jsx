import { CameraOff } from 'lucide-react';

import { useState, useEffect } from 'react';

export function ImageComponent({ src, ...rest }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    let objectUrl;
    if (!src) return;

    if (src.toString().includes('uploads')) {
      setImgSrc(import.meta.env.VITE_LOCAL_BASE_URL + src);
    } else {
      objectUrl = URL.createObjectURL(src);
      setImgSrc(objectUrl);
    }

    // Revoke the object URL after the image has finished loading
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return !imgSrc ? (
    <CameraOff className='size-[40%]' strokeWidth={1.5} />
  ) : (
    <img {...rest} src={imgSrc} alt={''} loading='lazy' />
  );
}
