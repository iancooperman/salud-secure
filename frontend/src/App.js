import logo from './logo.svg';
import './App.css';
import { generateSlug } from 'random-word-slugs';
let zxcvbn = require('zxcvbn');

function App() {
  document.title = "LAUSD Password Generator";

  return (
    <div className="App">
      <h1>LAUSD Password Generator</h1>
      <span><p id="generated-password">{randomAcceptablePassword()}</p><button onClick={replacePassword}>Regenerate</button><button onClick={copyPasswordToClipboard}>Copy to Clipboard</button></span>
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
  let symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?'];  
  let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  return randomSymbol;
}

function randomPassword() {
  return randomAdjective() + randomNoun() + randomDigit() + randomSymbol();
}

function randomAcceptablePassword() {
  while (true) {
    let password = randomPassword();
    if (password.length >= 15 && password.length <= 20) {
      if (zxcvbn(password).score >=3) {
        return password;
      }
    }
  }
}

function replacePassword() {
  let generatedPassword = document.getElementById("generated-password");
  generatedPassword.innerText = randomAcceptablePassword();
}

function copyPasswordToClipboard() {
  let generatedPassword = document.getElementById("generated-password");
  navigator.clipboard.writeText(generatedPassword.innerText);
  alert("Copied to clipboard.");
}


export default App;
