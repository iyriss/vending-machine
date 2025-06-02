type DrinksProps = {
  drinks: Drink[];
  selectedDrink: DrinkTypes | null;
  onSelect: (key: DrinkTypes | null) => void;
};

type DrinkCardProps = {
  drink: Drink;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (drink: Drink) => void;
};

type DrinkCardButtonProps = {
  isSelected: boolean;
  isDisabled: boolean;
  isSoldOut: boolean;
};

const Drinks: React.FC<DrinksProps> = ({ drinks, selectedDrink, onSelect }) => {
  const handleSelect = (drink: Drink) => {
    if (drink.available > 0) {
      onSelect(drink.key);
    }
  };

  return (
    <div className='mt-4 w-full'>
      <div className='text-xl font-bold mb-4'>Beverages</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[424px] mx-auto'>
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.key}
            drink={drink}
            isSelected={selectedDrink === drink.key}
            isDisabled={!!selectedDrink && selectedDrink !== drink.key}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

const DrinkCard: React.FC<DrinkCardProps> = ({
  drink,
  isSelected,
  isDisabled,
  onSelect,
}) => {
  const { name, price, available } = drink;
  const isSoldOut = available === 0;

  const handleClick = () => {
    if (!isDisabled && !isSoldOut) {
      onSelect(drink);
    }
  };

  return (
    <div
      className={`
        relative group border-2 shadow-md rounded-md px-2 py-4 
        bg-white text-steel w-full flex flex-col justify-center items-center
        ${isSelected ? 'border-primary' : 'border-silver'}
        ${
          !isDisabled && !isSoldOut ? 'cursor-pointer hover:border-primary' : ''
        }
      `}
      onClick={handleClick}
      aria-disabled={isDisabled || isSoldOut}
      role='button'
    >
      {isSelected && (
        <div className='absolute top-1 left-1 bg-[#008455] text-white rounded-md px-2 py-1 text-sm'>
          Selected
        </div>
      )}
      <p className='pt-4'>{name}</p>
      <p className='font-semibold'>{price}¢</p>
      <span className='text-muted text-sm'>{available} available</span>
      <div className='mt-5 h-8 flex items-center justify-center'>
        <DrinkCardButton
          isSelected={isSelected}
          isDisabled={isDisabled}
          isSoldOut={isSoldOut}
        />
      </div>
    </div>
  );
};

const DrinkCardButton: React.FC<DrinkCardButtonProps> = (props) => {
  if (props.isSoldOut) {
    return <span className='font-bold'>Sold out</span>;
  }

  if (props.isSelected) {
    return (
      <button className='border-none group-hover:underline text-sm cursor-pointer text-primary'>
        Cancel
      </button>
    );
  }

  return (
    <button
      disabled={props.isDisabled}
      className={`text-white rounded-lg border-none w-full px-3 py-2 max-w-28 ${
        props.isDisabled
          ? 'bg-silver cursor-not-allowed'
          : 'bg-primary group-hover:opacity-90 cursor-pointer'
      }`}
    >
      Select
    </button>
  );
};

export default Drinks;
