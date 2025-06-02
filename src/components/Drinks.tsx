type DrinksProps = {
  drinks: Drink[];
  selectedDrink: DrinkTypes | null;
  onSelect: (key: DrinkTypes | null) => void;
};

export const Drinks = ({ drinks, selectedDrink, onSelect }: DrinksProps) => {
  function handleSelect(drink: Drink) {
    console.log(selectedDrink, drink.key);
    if (drink.available > 0) {
      onSelect(selectedDrink === drink.key ? null : drink.key);
    }
  }

  return (
    <div className='mt-4 w-full'>
      <div className='text-xl font-bold mb-4'>Drinks</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[424px] mx-auto'>
        {drinks.map((drink) => {
          const { key, name, price, available } = drink;
          const isSelected = selectedDrink === key;

          return (
            <div
              key={key}
              className='border shadow-md rounded-md px-2 py-4 h-fit bg-white text-steel border-silver w-full flex flex-col justify-center items-center'
              onClick={() => handleSelect(drink)}
            >
              <p className='pt-4'>{name}</p>
              <p className='font-semibold'>{price}¢</p>
              <span className='text-muted text-sm'>{available} available</span>
              {isSelected ? (
                'Selected'
              ) : available > 0 ? (
                <button className='mt-5 cursor-pointer hover:opacity-95 bg-primary text-white rounded-lg border-none w-full px-3 py-2 max-w-28'>
                  Select
                </button>
              ) : (
                'Sold out'
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
