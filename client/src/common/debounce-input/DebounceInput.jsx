import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

export default function DebounceInput({ setterFunction, debounceTime = 500 }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (evt) => {
    const value = evt.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setterFunction(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, debounceTime]);

  return (
    <Input
      type='search'
      placeholder='Search full name...'
      className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white'
      onChange={handleChange}
    />
  );
}
