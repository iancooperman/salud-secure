import logo from './logo.svg';
import ReactGA from "react-ga4";
import './App.css';
import { useEffect, useState } from 'react';
import { generateSlug } from 'random-word-slugs';
import { Typography, Card, CardActions, CardContent, CardMedia, CssBaseline, Toolbar, Container, Button, ButtonGroup, FormControlLabel, Radio, RadioGroup, FormControl, TextField }from '@mui/material';
import Grid from '@mui/material/Grid2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

let zxcvbn = require('zxcvbn');


ReactGA.initialize('G-SF0WV9T7C1');
ReactGA.send({ hitType: "pageview", page: "/salud-secure", title: "Salud Secure Load" });

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Typography variant="h1" color="textPrimary">
        SaludSecure
      </Typography>
      <main>
        <div>
          <Container>
            <Grid container spacing={2}>
              <Grid size={3}>
                {/* purposely left blank for the moment */}
              </Grid>
              <Grid size={6}>
                <PasswordGenerator />
              </Grid>
              <Grid size={3}>
                {/* purposely left blank for the moment */}
              </Grid>
            </Grid>
          </Container>
        </div>
        
      </main>
    </div>
  );
}


function PasswordGenerator() {
  const [generateAdvancedPasswords, setGenerateAdvancedPasswords] = useState(true);
  const [password, setPassword] = useState("");

  function generatePassword() {
    console.log("run");
    if (generateAdvancedPasswords) {
      setPassword(randomAcceptableStaffPassword());
    }
    else {
      setPassword(randomAcceptableStudentPassword());
    }
  }

  async function copyPasswordToClipboard() {
    navigator.clipboard.writeText(password).then(() => {
      if (!isUserOnAndroid()) { // exclude android because android has its own toast message for this
        alert("Copied to clipboard.");
      }
    });
  }

  useEffect(() => {
    generatePassword();
  }, [generateAdvancedPasswords]);

  return (
    <div className='PasswordGenerator'>
      <Card  sx={{ 
        backgroundColor: 'primary.secondary',
        minWidth: 300,
        aspectRatio: 1.618
      }}>
          <CardContent sx={{
            height: '60%',
            // backgroundColor: 'skyblue',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby="password-difficulty-radio-buttons-group-label"
                defaultValue="advanced"
                name="password-difficulty-radio-buttons-group"
              >
                <FormControlLabel id="simple-password-generation" value="simple" control={ <Radio />} label="Simple" checked={!generateStaffPassword} onChange={ () => { setGenerateStaffPassword(false) } }/>
                <FormControlLabel id="advanced-password-generation" value="advanced" control={<Radio />} label="Advanced" checked={generateStaffPassword} onChange={ () => { setGenerateStaffPassword(true) } }/>
              </RadioGroup>
            </FormControl> */}
            <Button sx={{
              textTransform: 'none'
            }} 
            onClick={() => setGenerateAdvancedPasswords(!generateAdvancedPasswords)}>
              {generateAdvancedPasswords ? '"It needs to be even simpler."' : '"No wait! I like added security!"' }
            </Button>
          <TextField 
            id="generated-password" 
            value={password}
            // style={{ width: '80%' }}
            inputProps={{
              style: {
                textAlign: 'center',
              }
            }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }} 
          />
          </CardContent>
          <CardActions sx={{
            height: '40%',
            // backgroundColor: 'green',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <ButtonGroup variant='contained' aria-label='Basic button group'>
              <Button variant='contained' color='primary' onClick={ generatePassword } >Regenerate</Button>
              <Button variant='contained' color='primary' onClick={copyPasswordToClipboard} endIcon={<ContentCopyIcon />}>Copy to Clipboard  </Button>
            </ButtonGroup>
          </CardActions>
      </Card>
      
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


function isUserOnAndroid() {
  return /Android/i.test(navigator.userAgent);
}


export default App;
