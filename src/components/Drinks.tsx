type DrinksProps = {
  onSelect: (product: string) => void;
};

const drinks = [
  { name: 'Cola', price: 25, available: 10 },
  { name: 'Diet Cola', price: 35, available: 8 },
  { name: 'Lime Soda', price: 25, available: 0 },
  { name: 'Water', price: 45, available: 2 },
];

export const Drinks = ({ onSelect }: DrinksProps) => {
  return (
    <div className='my-8 w-full max-w-[424px]'>
      <div className='text-xl font-bold mb-4'>Drinks</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 sm:max-w-[424px] mx-auto'>
        {drinks.map(({ name, price, available }) => (
          <div
            className='border shadow-md rounded-md px-2 py-4 h-fit bg-white text-steel border-silver w-full flex flex-col justify-center items-center'
            onClick={() => onSelect('Cola')}
          >
            <p className='pt-4'>{name}</p>
            <p className='font-semibold'>{price}¢</p>
            <span className='text-muted text-sm'>{available} available</span>
            <button className='mt-5 cursor-pointer hover:opacity-95 bg-primary text-white rounded-lg border-none w-full px-3 py-2 max-w-28'>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
