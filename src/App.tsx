import { useState, type JSX } from 'react';
import { Display } from './components/Display';
import { Coins } from './components/Coins';
import Drinks from './components/Drinks';
import { AdminPanel } from './components/AdminPanel';
import './App.css';

const initialMessage = 'Select an option';

const initialDrinks: Drink[] = [
  { key: 'cola', name: 'Cola', price: 25, available: 10 },
  { key: 'diet-cola', name: 'Diet Cola', price: 35, available: 8 },
  { key: 'lime-soda', name: 'Lime Soda', price: 25, available: 0 },
  { key: 'water', name: 'Water', price: 45, available: 2 },
];

const initialCoins = {
  5: 5,
  10: 5,
  25: 5,
};

type Coin = 5 | 10 | 25;

function App() {
  const [drinks, setDrinks] = useState(initialDrinks);
  const [selectedDrink, setSelectedDrink] = useState<DrinkTypes | null>(null);
  const [message, setMessage] = useState<string | JSX.Element>(initialMessage);
  const [insertedCoins, setInsertedCoins] = useState<number>(0);
  const [coinInventory, setCoinInventory] = useState(initialCoins);
  const [sessionCoins, setSessionCoins] = useState<Record<Coin, number>>({
    5: 0,
    10: 0,
    25: 0,
  });

  function handleSelectDrink(key: DrinkTypes | null) {
    const drink = drinks.find((drink) => drink.key === key);
    if (!drink) return;

    if (drink.key === selectedDrink) {
      handleCancel();
      return;
    }

    if (drink.available === 0) {
      setMessage(`${drink.name} is out of stock.`);
      return;
    }

    setMessage(`Insert ${drink.price}¢ for ${drink.name}`);
    setSelectedDrink(key);
  }

  function handleCoinClick(coin: Coin) {
    if (!selectedDrink) {
      setMessage('Please select a beverage first.');
      return;
    }

    const drink = drinks.find((drink) => drink.key === selectedDrink);
    if (!drink) return;

    const newAmount = insertedCoins + coin;
    const remaining = drink.price - newAmount;

    setInsertedCoins(newAmount);
    const newSessionCoins = { ...sessionCoins, [coin]: sessionCoins[coin] + 1 };
    setSessionCoins(newSessionCoins);

    if (remaining > 0) {
      setMessage(
        (
          <div>
            <div>Balance: {newAmount}¢</div>
            <div>
              Insert {remaining}¢ more for {drink.name}
            </div>
          </div>
        ) as JSX.Element
      );
    } else {
      const change = newAmount - drink.price;
      if (!canMakeChange(change)) {
        setInsertedCoins(0);
        setSessionCoins({ 5: 0, 10: 0, 25: 0 });
        setMessage(
          'Cannot provide change. Please cancel and use exact amount.'
        );
        return;
      }

      dispenseDrink(drink.key);
      returnChange(change);
      setInsertedCoins(0);
      setSelectedDrink(null);
      commitCoins(newSessionCoins);
    }
  }

  function canMakeChange(amount: number): boolean {
    let remaining = amount;
    const copy = { ...coinInventory };
    const coins: Coin[] = [25, 10, 5];

    for (const coin of coins) {
      while (remaining >= coin && copy[coin] > 0) {
        remaining -= coin;
        copy[coin]--;
      }
    }

    return remaining === 0;
  }

  function returnChange(amount: number) {
    const coins: Coin[] = [25, 10, 5];
    const newInventory = { ...coinInventory };
    let remaining = amount;

    for (const coin of coins) {
      while (remaining >= coin && newInventory[coin] > 0) {
        remaining -= coin;
        newInventory[coin]--;
      }
    }

    setCoinInventory(newInventory);
    setMessage((prev) => `${prev} Returned ${amount}¢`);
  }

  function dispenseDrink(key: DrinkTypes) {
    setDrinks((prev) =>
      prev.map((drink) =>
        drink.key === key ? { ...drink, available: drink.available - 1 } : drink
      )
    );
    const drink = drinks.find((drink) => drink.key === key);
    if (drink) {
      setMessage(`Enjoy your ${drink.name}!`);
      setTimeout(() => {
        setMessage(initialMessage);
      }, 3000);
    }
  }

  function handleCancel() {
    setInsertedCoins(0);
    setSelectedDrink(null);
    setSessionCoins({ 5: 0, 10: 0, 25: 0 });
    setMessage('Transaction cancelled.');
    setTimeout(() => {
      setMessage(initialMessage);
    }, 3000);
  }

  function commitCoins(newSessionCoins: Record<Coin, number>) {
    setCoinInventory((prev) => {
      console.log('prev', prev);
      console.log('sessionCoins', sessionCoins);
      const updated = { ...prev };

      for (const coin of [5, 10, 25] as Coin[]) {
        updated[coin] += newSessionCoins[coin];
      }
      return updated;
    });
    setSessionCoins({ 5: 0, 10: 0, 25: 0 });
  }

  return (
    <div className='m-auto w-full min-h-screen h-full gap-10 py-5 flex justify-center'>
      <div className='flex justify-center w-full h-full gap-10 mt-10'>
        <div className='bg-midnight w-full h-full max-w-[465px] border border-silver/20 rounded-lg px-8 py-10'>
          <Display message={message} />
          <Drinks
            drinks={drinks}
            selectedDrink={selectedDrink}
            onSelect={handleSelectDrink}
          />
          <Coins onCoinClick={handleCoinClick} />
        </div>

        <AdminPanel
          coinInventory={coinInventory}
          sessionCoins={sessionCoins}
          selectedDrink={drinks.find((drink) => selectedDrink === drink.key)}
        />
      </div>
    </div>
  );
}

export default App;
