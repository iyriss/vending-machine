const coins: Coin[] = [5, 10, 25];

type CoinsProps = {
  purchaseButtonEnabled: boolean;
  cancelButtonEnabled: boolean;
  onPurchase: () => void;
  onCoinClick: (coin: Coin) => void;
  onCancel: () => void;
};

export const Coins: React.FC<CoinsProps> = ({
  purchaseButtonEnabled,
  cancelButtonEnabled,
  onPurchase,
  onCoinClick,
  onCancel,
}) => {
  return (
    <div className='mt-8 space-y-4'>
      <div className='text-xl font-bold mb-4'>Insert</div>
      <div className='grid grid-cols-3 gap-4'>
        {coins.map((coin) => (
          <button
            key={coin}
            onClick={() => onCoinClick(coin as Coin)}
            className='p-4 cursor-pointer bg-gray-900 rounded border border-silver/20 hover:bg-gray-800 transition-colors'
          >
            {coin}¢
          </button>
        ))}
      </div>
      <div className='flex gap-4'>
        <button
          onClick={onCancel}
          disabled={!cancelButtonEnabled}
          className={`flex-1 px-3 py-2 rounded-md transition-colors ${
            cancelButtonEnabled
              ? 'bg-red-600 hover:bg-red-700 cursor-pointer border-none'
              : 'bg-silver/40 cursor-not-allowed border border-silver/20 '
          }`}
        >
          Cancel
        </button>

        <button
          onClick={onPurchase}
          disabled={!purchaseButtonEnabled}
          className={`flex-1 px-3 py-2 rounded-md transition-colors ${
            purchaseButtonEnabled
              ? 'bg-green-700 hover:bg-green-800 cursor-pointer border-none'
              : 'bg-silver/40 cursor-not-allowed border border-silver/20 '
          }`}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};
