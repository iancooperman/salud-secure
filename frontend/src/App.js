import logo from './logo.svg';
import ReactGA from "react-ga4";
import './App.css';
import { useEffect, useState } from 'react';
import { generateSlug } from 'random-word-slugs';
import { Typography, Card, CardActions, CardContent, CardMedia, CssBaseline, Toolbar, Container, Button, ButtonGroup, FormControlLabel, Radio, RadioGroup, FormControl, TextField, Box }from '@mui/material';
import Grid from '@mui/material/Grid2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { KoFiDialog, KoFiButton, KoFiWidget, KoFiPanel } from "react-kofi";
import "react-kofi/dist/styles.css";

let zxcvbn = require('zxcvbn');


ReactGA.initialize('G-SF0WV9T7C1');
ReactGA.send({ hitType: "pageview", page: "/salud-secure", title: "Salud Secure Load" });

function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Content /> 
      <Footer />
    </div>
  );
}

function Content() {
  return (
    <div className="Content">
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

function Footer() {
  return (
    <footer style={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
    }}>
      <hr></hr>   
      <Container sx={{
        minHeight: '200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <KoFiButton id='iancooperman' />
        <Typography
          sx={{
            marginTop: '5px',
          }}
        >Your contribution will always be appreciated, but will never be necessary.</Typography>
      </Container>
    </footer>
  )
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
        minHeight: 234,
        aspectRatio: 1.618
      }}>
        <CardContent sx={{
            height: '100%',
            // backgroundColor: 'skyblue',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            <Typography variant='h5'>Generate a simple (but usable) password.</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
          }}>
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
            <Button size='small' sx={{
                textTransform: 'none',
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
              onClick={() => setGenerateAdvancedPasswords(!generateAdvancedPasswords)}>
                {generateAdvancedPasswords ? '"It needs to be even simpler."' : '"No wait! I like added security!"' }
              </Button>
          </Box>
          <ButtonGroup variant='contained' aria-label='Basic button group'>
            <Button variant='contained' color='primary' onClick={ generatePassword } endIcon={<RefreshIcon />}>Regenerate</Button>
            <Button variant='contained' color='primary' onClick={copyPasswordToClipboard} endIcon={<ContentCopyIcon />}>Copy to Clipboard  </Button>
          </ButtonGroup>
        </CardContent>
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
