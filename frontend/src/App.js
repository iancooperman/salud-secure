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
  let slug = generateSlug(1, { 
    partsOfSpeech: ['adjective']
  });
  slug = capitalize(slug);
  return slug;
}

function randomNoun() {
  let slug = generateSlug(1, { 
    partsOfSpeech: ['noun'],
    categories: {
      noun: [
        "animals",
        "business",
        "education",
        "family",
        "food",
        "health",
        "media",
        "people",
        "place",
        "profession",
        "sports",
        "thing",
        "time",
        "transportation"
      ]
    } 
  });
  slug = capitalize(slug);
  return slug;
}

function randomDigit() {
  return Math.floor(Math.random() * 10).toString();
}

function randomSymbol() {
  let symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '>', 
  , '<', '?'];
  let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  return randomSymbol;
}

function randomPassword() {
  return randomAdjective() + randomNoun() + randomDigit() + randomSymbol();
}



export default App;
