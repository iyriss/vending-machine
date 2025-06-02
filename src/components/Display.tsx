type DisplayProps = {
  message: string;
};

const coins = [5, 10, 25];

export const Display = ({ message }: DisplayProps) => (
  <div className='w-full'>
    <div className='bg-[#10111A] border-silver border text-[#41D965] text-2xl font-mono px-5 flex items-center rounded-md min-h-[80px]'>
      {message}
    </div>
    <div className='py-4 mt-2 flex gap-8 items-center w-full '>
      <p className='text-white/70'>Accepted coins</p>
      <p className='flex gap-6'>
        {coins.map((coin) => (
          <span key={coin} className='font-semibold'>
            {coin}¢
          </span>
        ))}
      </p>
    </div>
  </div>
);
