import logo from './logo.svg';
import ReactGA from "react-ga4";
import './App.css';
import { useEffect, useState } from 'react';
import { generateSlug } from 'random-word-slugs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormGroup, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
let zxcvbn = require('zxcvbn');


ReactGA.initialize('G-SF0WV9T7C1');
ReactGA.send({ hitType: "pageview", page: "/salud-secure", title: "Salud Secure Load" });

function App() {
  document.title = "SaludSecure";

  return (
    <div className="App">
      <h1>SaludSecure</h1>
      <PasswordGenerator />
    </div>
  );
  
}

function PasswordGenerator() {
  const [advancedPasswordComplexity, setAdvancedPasswordComplexity] = useState(true);
  const [password, setPassword] = useState("");

  function generatePassword() {
    console.log("run");
    if (advancedPasswordComplexity) {
      setPassword(randomAcceptableStaffPassword());
    }
    else {
      setPassword(randomAcceptableStudentPassword());
    }
  }

  useEffect(() => {
    generatePassword();
  }, [advancedPasswordComplexity]);

  return (
    <div className='PasswordGenerator'>
      <FormGroup>
        <FormLabel 
        htmlFor="simple-password-generation" 
        id="demo-radio-buttons-group-label">
          Password Complexity
        </FormLabel>
        <FormControlLabel 
          control={<Switch
                      className='centered'
                      checked={advancedPasswordComplexity}
                      onChange={() => setAdvancedPasswordComplexity(!advancedPasswordComplexity)}/>} 
          label="Advanced" />
      </FormGroup>
      <span><p id="generated-password">{password}</p><Button variant='contained' onClick={ generatePassword } >Regenerate</Button><Button variant='contained' endIcon={<ContentCopyIcon />} onClick={copyPasswordToClipboard}>Copy to Clipboard</Button></span>
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

function randomStaffPassword() {
  return randomAdjective() + randomNoun() + randomDigit() + randomSymbol();
}

function randomStudentPassword() {
  return randomAdjective() + randomNoun() + randomDigit();
}

function randomAcceptableStaffPassword() {
  while (true) {
    let password = randomStaffPassword();
    if (password.length >= 15 && password.length <= 20) {
      if (zxcvbn(password).score >=3) {
        return password;
      }
    }
  }
}

function randomAcceptableStudentPassword() {
  // Requirements for student passwords:
  //   - Must be 8 to 20 characters in length
  //   - Must have at least 1 numeric character
  //   - Must have at least 1 letter
  //   - Cannot be commonly used passwords (i.e. must be at least fairly strong, as judged by zxcvbn)
  //   - Cannot contain username or email

  while (true) {
    let password = randomStudentPassword();
    if (password.length >= 8 && password.length <= 20) {
      if (zxcvbn(password).score >=3) {
        return password;
      }
    }
  }

}

function replacePassword() {
  let generatedPassword = document.getElementById("generated-password");
  generatedPassword.innerText = randomAcceptableStudentPassword();
}

function copyPasswordToClipboard() {
  let generatedPassword = document.getElementById("generated-password");
  navigator.clipboard.writeText(generatedPassword.innerText).then(() => {
    if (!isUserOnAndroid()) { // exclude android because android has its own toast message for this
      alert("Copied to clipboard.");
    }
  });
  
}

function isUserOnAndroid() {
  return /Android/i.test(navigator.userAgent);
}


export default App;
