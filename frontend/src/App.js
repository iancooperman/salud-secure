import logo from './logo.svg';
import './App.css';
import { generateSlug } from 'random-word-slugs';

function App() {
  return (
    <div className="App">
      <h1>LAUSD Password Generator</h1>
      <p>{randomPassword()}</p>
    </div>
  );
}



function randomAdjective() {
  return "Fluffy";
}

function randomNoun() {
  return "Hat";
}

function randomDigit() {
  return '1';
}

function randomSymbol() {
  return '!';
}

function randomPassword() {
  return randomAdjective() + randomNoun() + randomDigit() + randomSymbol();
}



export default App;
