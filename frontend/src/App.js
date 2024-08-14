import logo from './logo.svg';
import './App.css';
import { generateSlug } from 'random-word-slugs';
let zxcvbn = require('zxcvbn');

function App() {
  document.title = "SaludSecure";

  return (
    <div className="App">
      <h1>SaludSecure</h1>
      <span><p id="generated-password">{randomAcceptableStudentPassword()}</p><button onClick={replacePassword}>Regenerate</button><button onClick={copyPasswordToClipboard}>Copy to Clipboard</button></span>
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

function randomAcceptablePassword(minLength = 15, maxLength = 20) {
  while (true) {
    let password = randomPassword();
    if (password.length >= minLength && password.length <= maxLength) {
      if (zxcvbn(password).score >=3) {
        return password;
      }
    }
  }
}

function randomAcceptableStaffPassword() {
  return randomAcceptablePassword(15, 20);
}

function randomAcceptableStudentPassword() {
  return randomAcceptablePassword(8, 20);
}


function replacePassword() {
  let generatedPassword = document.getElementById("generated-password");
  generatedPassword.innerText = randomAcceptableStudentPassword();
}

function copyPasswordToClipboard() {
  let generatedPassword = document.getElementById("generated-password");
  navigator.clipboard.writeText(generatedPassword.innerText).then(() => {
    alert("Copied to clipboard.");
  });
  
}


export default App;
