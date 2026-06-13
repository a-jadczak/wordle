import GuessBoard from './components/GuessBoard';
import Keyboard from './components/Keyboard/Keyboard';

function App() {
  return (
    <main className="grid h-screen" style={{ gridTemplateRows: 'min-content 2fr 2fr' }}>
      <h1 className="text-center text-6xl p-5">Wordle</h1>
      <GuessBoard />
      <Keyboard />
    </main>
  );
}

export default App;
