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


function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function randomAdjective() {
  let slug = generateSlug(1, { partsOfSpeech: ['adjective'] });
  slug = capitalize(slug);
  return slug;
}

function randomNoun() {
  let slug = generateSlug(1, { partsOfSpeech: ['noun'] });
  slug = capitalize(slug);
  return slug;
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
