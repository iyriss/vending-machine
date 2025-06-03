type AdminPanelProps = {
  coinInventory: Record<Coin, number>;
  sessionCoins: Record<Coin, number>;
  selectedDrink?: Drink;
  onClose?: () => void;
};

export const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const totalInventory = Object.entries(props.coinInventory).reduce(
    (sum, [coin, count]) => sum + Number(coin) * count,
    0
  );
  const totalSession = Object.entries(props.sessionCoins).reduce(
    (sum, [coin, count]) => sum + Number(coin) * count,
    0
  );

  return (
    <div className='w-[465px] h-full bg-midnight border-l border-silver/20 px-8 py-10 overflow-y-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Admin Panel</h2>
        <div
          className='cursor-pointer flex items-center gap-1 hover:underline text-[#9877ff] transition-opacity'
          onClick={props.onClose}
        >
          Close
        </div>
      </div>

      <div className='space-y-6'>
        <div className='py-4'>
          <h3 className='text-lg font-semibold mb-3 text-white/90'>
            Coin inventory
          </h3>
          <div className='grid grid-cols-3 gap-4'>
            {Object.entries(props.coinInventory).map(([coin, count]) => (
              <div
                key={coin}
                className='text-center p-3 bg-gray-900 rounded border border-silver/20'
              >
                <div className='text-sm text-white/70'>{coin}¢</div>
                <div className='font-medium'>{count}</div>
              </div>
            ))}
          </div>
          <div className='mt-3 pt-3 flex items-center gap-2 justify-between'>
            <span className='text-white/70'>Total: </span>
            <span className='font-semibold'>
              ${(totalInventory / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <hr className='border-silver/20' />

        <div className='py-4'>
          <h3 className='text-lg font-semibold mb-3 text-white/90'>
            Current session coins
          </h3>
          <div className='grid grid-cols-3 gap-4'>
            {Object.entries(props.sessionCoins).map(([coin, count]) => (
              <div
                key={coin}
                className='text-center p-3 bg-gray-900 rounded border border-silver/20'
              >
                <div className='text-sm text-white/70'>{coin}¢</div>
                <div className='font-medium'>{count}</div>
              </div>
            ))}
          </div>
          <div className='mt-3 pt-3 flex items-center gap-2 justify-between'>
            <span className='text-white/70'>Total: </span>
            <span className='font-semibold'>
              ${(totalSession / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <hr className='border-silver/20' />

        <div className='py-4'>
          <h3 className='text-lg font-semibold mb-3 text-white/90'>
            Selected beverage
          </h3>
          {props.selectedDrink ? (
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Name:</span>
                <span className='font-medium'>{props.selectedDrink.name}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Price:</span>
                <span className='font-medium'>
                  ${(props.selectedDrink.price / 100).toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Available:</span>
                <span
                  className={`font-medium ${
                    props.selectedDrink.available > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {props.selectedDrink.available}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-white/70'>Status:</span>
                <span
                  className={`font-medium ${
                    props.selectedDrink.available > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {props.selectedDrink.available > 0
                    ? 'In Stock'
                    : 'Out of Stock'}
                </span>
              </div>
            </div>
          ) : (
            <div className='text-white/70 py-2'>No drink selected</div>
          )}
        </div>

        <hr className='border-silver/20' />

        <div className='py-4'>
          <h3 className='text-lg font-semibold mb-3 text-white/90'>
            Transaction status
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-white/70'>Session total:</span>
              <span className='font-medium text-white'>
                ${(totalSession / 100).toFixed(2)}
              </span>
            </div>
            {props.selectedDrink && (
              <>
                <div className='flex justify-between items-center'>
                  <span className='text-white/70'>Required Amount:</span>
                  <span className='font-medium text-white'>
                    ${(props.selectedDrink.price / 100).toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/70'>Remaining:</span>
                  <span className='font-medium text-white'>
                    $
                    {((props.selectedDrink.price - totalSession) / 100).toFixed(
                      2
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
