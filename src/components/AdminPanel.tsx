type AdminPanelProps = {
  coinInventory: Record<Coin, number>;
  sessionCoins: Record<Coin, number>;
  selectedDrink?: Drink;
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
    <div className='w-full mb-auto h-full max-w-[465px] border border-silver/20 rounded-lg px-8 py-10 bg-midnight'>
      <h2 className='text-2xl font-bold mb-6'>Admin Panel</h2>

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
            <span className='font-semibold'>{totalInventory}¢</span>
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
            <span className='font-semibold'>{totalSession}¢</span>
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
                  {props.selectedDrink.price}¢
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
              <span className='font-medium text-white'>{totalSession}¢</span>
            </div>
            {props.selectedDrink && (
              <>
                <div className='flex justify-between items-center'>
                  <span className='text-white/70'>Required Amount:</span>
                  <span className='font-medium text-white'>
                    {props.selectedDrink.price}¢
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/70'>Remaining:</span>
                  <span
                    className={`font-medium ${
                      totalSession >= props.selectedDrink.price
                        ? 'text-green-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {Math.max(0, props.selectedDrink.price - totalSession)}¢
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
