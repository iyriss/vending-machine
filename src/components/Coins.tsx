const coins: Coin[] = [5, 10, 25];

type CoinsProps = {
  onCoinClick: (coin: Coin) => void;
};

export const Coins = (props: CoinsProps) => {
  function handleCoinClick(coin: Coin) {
    props.onCoinClick(coin);
  }

  return (
    <div className='my-8 w-full'>
      <div className='text-xl font-bold mb-4'>Insert</div>

      <div className='flex gap-4'>
        {coins.map((coin) => (
          <button
            key={coin}
            type='button'
            onClick={() => handleCoinClick(coin)}
            className='font-bold shadow-lg hover:opacity-90 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 h-14 w-14 flex items-center justify-center border-2 border-yellow-500/30 text-yellow-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400'
            aria-label={`Insert ${coin} cents`}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-tr from-yellow-200/10 to-transparent'></div>
            {coin}¢
          </button>
        ))}
      </div>
    </div>
  );
};

// ¢
