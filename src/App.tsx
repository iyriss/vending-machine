import { useState } from 'react';
import { Display } from './components/Display';
import { Drinks } from './components/Drinks';
import { Coins } from './components/Coins';
import './App.css';

const initialMessage = 'Select a drink';
const drinks: Drink[] = [
  { key: 'cola', name: 'Cola', price: 25, available: 10 },
  { key: 'diet-cola', name: 'Diet Cola', price: 35, available: 8 },
  { key: 'lime-soda', name: 'Lime Soda', price: 25, available: 0 },
  { key: 'water', name: 'Water', price: 45, available: 2 },
];

function App() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkTypes | null>(null);
  const [message, setMessage] = useState<string>(initialMessage);

  function handleSelectDrink(key: DrinkTypes | null) {
    const drink = drinks.find((drink) => drink.key === key);
    setMessage(key ? `Insert ${drink?.price}¢` : initialMessage);
    setSelectedDrink(key);
  }

  return (
    <div className='w-full min-h-screen h-full flex items-center justify-center'>
      <div className='w-full max-w-[465px] border border-silver/20 rounded-lg px-8 py-10'>
        <Display message={message} />
        <Drinks
          drinks={drinks}
          selectedDrink={selectedDrink}
          onSelect={handleSelectDrink}
        />
        {selectedDrink && <Coins />}
      </div>
    </div>
  );
}

export default App;
