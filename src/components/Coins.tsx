const coins = [5, 10, 25];

export const Coins = () => {
  return (
    <div className='my-8 w-full max-w-[424px]'>
      <div className='text-xl font-bold mb-4'>Insert</div>
      <div className='flex gap-4'>
        {coins.map((coin) => (
          <div className='font-bold cursor-pointer shadow hover:opacity-90 rounded-full bg-yellow-700 h-14 w-14 flex items-center justify-center'>
            {coin} ¢
          </div>
        ))}
      </div>
    </div>
  );
};

// ¢
