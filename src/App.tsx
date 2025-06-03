import { useState, useRef, type JSX } from 'react';
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
  const [showAdmin, setShowAdmin] = useState(false);
  const [sessionCoins, setSessionCoins] = useState<Record<Coin, number>>({
    5: 0,
    10: 0,
    25: 0,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setTemporaryMessage(
    content: string | JSX.Element,
    duration = 3000,
    nextMessage: string | JSX.Element = initialMessage
  ) {
    setMessage(content);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setMessage(nextMessage);
      timeoutRef.current = null;
    }, duration);
  }

  function handleSelectDrink(key: DrinkTypes | null) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const drink = drinks.find((drink) => drink.key === key);
    if (!drink) return;

    if (drink.key === selectedDrink) {
      setSelectedDrink(null);
      setMessage(
        <div>
          {insertedCoins > 0 && (
            <div>Balance: ${(insertedCoins / 100).toFixed(2)}</div>
          )}
          <div className='mt-2'>Select a beverage</div>
        </div>
      );
      return;
    }

    if (drink.available === 0) {
      setTemporaryMessage(
        `${drink.name} is out of stock.`,
        3000,
        <div>
          <div>Balance: ${(insertedCoins / 100).toFixed(2)}</div>
          <div className='mt-2'>Select an option</div>
        </div>
      );
      return;
    }

    setSelectedDrink(key);

    // Check if we already have enough money
    if (insertedCoins >= drink.price) {
      setMessage(
        <div>
          <div>Balance: ${(insertedCoins / 100).toFixed(2)}</div>
          <div className='mt-2'>Press purchase to get your {drink.name}</div>
        </div>
      );
    } else {
      const remaining = drink.price - insertedCoins;
      setMessage(
        <div>
          <div>Balance: ${(insertedCoins / 100).toFixed(2)}</div>
          <div>
            Insert ${(remaining / 100).toFixed(2)}{' '}
            {remaining === drink.price ? '' : 'more'} for {drink.name}
          </div>
        </div>
      );
    }
  }

  function handlePurchase() {
    if (!selectedDrink) return;

    const drink = drinks.find((drink) => drink.key === selectedDrink);
    if (!drink || drink.available < 1) return;

    const change = insertedCoins - drink.price;
    if (!canMakeChange(change)) {
      setInsertedCoins(0);
      setSessionCoins({ 5: 0, 10: 0, 25: 0 });
      setTemporaryMessage('Cannot provide change, please use exact amount.');
      setSelectedDrink(null);
      return;
    }

    dispenseDrink(drink.key);
    returnChange(change);
    setInsertedCoins(0);
    setSelectedDrink(null);
    commitCoins(sessionCoins);
  }

  function handleCoinClick(coin: Coin) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const newAmount = insertedCoins + coin;
    setInsertedCoins(newAmount);
    const newSessionCoins = { ...sessionCoins, [coin]: sessionCoins[coin] + 1 };
    setSessionCoins(newSessionCoins);

    if (!selectedDrink) {
      setMessage(
        <div>
          <div>Balance: ${(newAmount / 100).toFixed(2)}</div>
          <div>Select a beverage</div>
        </div>
      );
      return;
    }

    const drink = drinks.find((drink) => drink.key === selectedDrink);
    if (!drink || drink.available < 1) return;

    const remaining = drink.price - newAmount;

    if (remaining > 0) {
      setMessage(
        <div>
          <div>Balance: ${(newAmount / 100).toFixed(2)}</div>
          <div>
            Insert ${(remaining / 100).toFixed(2)} more for {drink.name}
          </div>
        </div>
      );
    } else {
      setMessage(
        <div>
          <div>Balance: ${(newAmount / 100).toFixed(2)}</div>
          <div className='mt-2'>Press purchase to get your {drink.name}</div>
        </div>
      );
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
    setTemporaryMessage(
      ((prev: string) =>
        `${prev} Returned $${(amount / 100).toFixed(2)}`) as unknown as string
    );
  }

  function dispenseDrink(key: DrinkTypes) {
    setDrinks((prev) =>
      prev.map((drink) =>
        drink.key === key ? { ...drink, available: drink.available - 1 } : drink
      )
    );
    const drink = drinks.find((drink) => drink.key === key);
    if (drink) {
      setTemporaryMessage(`Enjoy your ${drink.name}!`);
    }
  }

  function handleCancel() {
    setInsertedCoins(0);
    setSelectedDrink(null);
    setSessionCoins({ 5: 0, 10: 0, 25: 0 });
    setTemporaryMessage('Transaction cancelled.');
  }

  function commitCoins(newSessionCoins: Record<Coin, number>) {
    setCoinInventory((prev) => {
      const updated = { ...prev };

      for (const coin of [5, 10, 25] as Coin[]) {
        updated[coin] += newSessionCoins[coin];
      }
      return updated;
    });
    setSessionCoins({ 5: 0, 10: 0, 25: 0 });
  }

  return (
    <div className='min-w-screen relative w-full min-h-screen h-full gap-10'>
      <div className='w-full h-full mx-auto my-20 relative'>
        <div className='bg-midnight w-full h-full mx-auto max-w-[465px] border border-silver/20 rounded-lg px-8 py-10'>
          <Display message={message} />
          <Drinks
            drinks={drinks}
            selectedDrink={selectedDrink}
            onSelect={handleSelectDrink}
          />
          <Coins
            cancelButtonEnabled={insertedCoins > 0 || !!selectedDrink}
            onCoinClick={handleCoinClick}
            onCancel={handleCancel}
            purchaseButtonEnabled={
              !!selectedDrink &&
              insertedCoins >=
                (drinks.find((drink) => drink.key === selectedDrink)?.price ||
                  0)
            }
            onPurchase={handlePurchase}
          />
        </div>
        {!showAdmin && (
          <button
            onClick={() => setShowAdmin(true)}
            className='absolute right-12 -top-12 border-none text-primary rounded-l-lg px-4 py-2 hover:underline cursor-pointer transition-colors'
          >
            Show coin inventory
          </button>
        )}

        <div
          className={`fixed right-0 top-0 h-full transition-transform duration-300 ease-in-out ${
            showAdmin ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <AdminPanel
            coinInventory={coinInventory}
            sessionCoins={sessionCoins}
            selectedDrink={drinks.find((drink) => selectedDrink === drink.key)}
            onClose={() => setShowAdmin(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
