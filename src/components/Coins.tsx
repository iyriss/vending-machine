const coins: Coin[] = [5, 10, 25];

type CoinsProps = {
  cancelButtonEnabled: boolean;
  onCoinClick: (coin: Coin) => void;
  onCancel: () => void;
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
            className='font-bold shadow-lg hover:opacity-90 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 h-14 w-14 flex items-center justify-center border-2 border-yellow-500/30 text-yellow-100 relative overflow-hidden cursor-pointer'
            aria-label={`Insert ${coin} cents`}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-tr from-yellow-200/10 to-transparent'></div>
            {coin}¢
          </button>
        ))}
      </div>

      <div className='mt-6 flex justify-end'>
        <button
          className={`border-none min-w-[100px] bg-[#dc0000] text-white px-2 py-3 rounded-md shadow-md ${
            props.cancelButtonEnabled
              ? 'hover:bg-[#cb0d0d] cursor-pointer '
              : 'bg-silver/70 cursor-not-allowed'
          }`}
          disabled={!props.cancelButtonEnabled}
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// todo: cents for over 100
