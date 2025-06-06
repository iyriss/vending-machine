import { type JSX } from 'react';

type DisplayProps = {
  message: string | JSX.Element;
};

const coins = [5, 10, 25];

export const Display = ({ message }: DisplayProps) => (
  <div className='w-full'>
    <div
      className='bg-[#10111A] border-silver border text-[#41D965] text-2xl font-mono px-5 flex items-center rounded-md min-h-[120px]'
      role='status'
      aria-live='polite'
    >
      {message}
    </div>
    <div className='py-4 mt-2 flex gap-8 items-center w-full'>
      <p className='text-white/70 whitespace-nowrap'>Accepted coins</p>
      <p className='flex gap-6 text-white/90'>
        {coins.map((coin) => (
          <span key={coin} className='font-semibold'>
            {coin}¢
          </span>
        ))}
      </p>
    </div>
  </div>
);
