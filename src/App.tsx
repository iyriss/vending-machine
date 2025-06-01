import { Display } from './components/Display';
import { Drinks } from './components/Drinks';
import { Coins } from './components/Coins';
import './App.css';

function App() {
  return (
    <div className='w-full min-h-screen h-full flex justify-center items-center flex-col'>
      <Display message='Select a drink' />
      <Drinks onSelect={() => {}} />
      <Coins />
    </div>
  );
}

export default App;
