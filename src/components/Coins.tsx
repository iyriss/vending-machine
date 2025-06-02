const coins = [5, 10, 25];

export const Coins = () => {
  return (
    <div className='my-8 w-full'>
      <div className='text-xl font-bold mb-4'>Insert</div>

      <div className='flex gap-4'>
        {coins.map((coin) => (
          <div
            key={coin}
            className='font-bold cursor-pointer shadow-lg hover:opacity-90 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 h-14 w-14 flex items-center justify-center border-2 border-yellow-500/30 text-yellow-100 relative overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-tr from-yellow-200/10 to-transparent'></div>
            {coin}¢
          </div>
        ))}
      </div>
    </div>
  );
};

// ¢
