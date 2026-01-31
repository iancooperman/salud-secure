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

let BANNED_WORDS = [
  "black",
  "brown",
  "repulsive",
  "nigeria",
  "appalling",
  "china"
];

function App() {

  return (
    <div className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #009fe2 0%, #0077b3 100%)',
      }}
    >
      <CssBaseline />
      <Content
        sx={{
          flex: 1,
        }}
      />
      <Footer />
    </div>
  );
}

function Content() {
  return (
    <div className="Content">
       <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontWeight: 700,
          textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          marginTop: { xs: 3, md: 5 },
          marginBottom: { xs: 3, md: 5 },
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
        }}
      >
        SaludSecure
      </Typography>
      <main>
        <div>
          <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
            <PasswordGenerator />
          </Container>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, mt: 4 }}>
            <About />
          </Container>
          </div>
          </main>
    </div>
  );
}

function About() {

  let paragraphs = [
    "SaludSecure was born out of a desire to lend a helping hand in simplifying password creation, amidst the increasingly complex requirements imposed by a certain school-adjacent organization. As soon as the requirements were unveiled, the author of this site knew they might be a bit of a stretch for his non-IT peers to master.",
    'The requirement that new passwords must not be "common" left many feeling anxious, unsure about what to do after their otherwise good-enough password was rejected for being too "common", and asking for a simpler solution.',
    "SaludSecure saves the day by generating passwords that are guaranteed* to not result in any red Xs, while still being straightforward enough to remember. And, with a bit of luck, even the most digitally-challenged individuals can use them with ease."
  ];


  return (
    <Box className='About' sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 3,
      padding: { xs: 3, md: 4 },
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    }}>

    <Typography
      variant='h3'
      sx={{
        marginBottom: 2,
        fontWeight: 600,
        fontSize: { xs: '1.75rem', md: '2.5rem' },
        color: '#009fe2'
      }}
    >
      About
    </Typography>
      {paragraphs.map((paragraph) => (
        <Typography
          key={paragraph}
          sx={{
            marginBottom: 2,
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', md: '1rem' }
          }}
        >
          {paragraph}
        </Typography>
      ))}

        <Typography sx={{
        marginTop: 2,
        fontSize: { xs: '0.7rem', md: '0.75rem' },
        fontStyle: 'italic',
        color: 'text.secondary'
      }}>*passing password not guaranteed.</Typography>
    </Box>
  );
}

function Footer() {
  return (
    <footer style={{
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      marginTop: '60px'
    }}>
      <Container sx={{
        minHeight: '200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}>
        <KoFiButton id='iancooperman' />
        <Typography
          sx={{
            marginTop: 2,
            color: 'white',
            textAlign: 'center',
            px: 2,
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >Your contribution will always be appreciated, but will never be necessary.</Typography>
        <a
          href='mailto:ian.pl.cooperman@gmail.com?subject=SaludSecure'
          style={{ textDecoration: 'none' }}
        >
          <Typography sx={{
            color: 'white',
            textDecoration: 'underline',
            marginTop: 1,
            '&:hover': {
              opacity: 0.8
            }
          }}>Email me feedback!</Typography>
        </a>
      </Container>
    </footer>
  )
}


function PasswordGenerator() {
  const [generateAdvancedPasswords, setGenerateAdvancedPasswords] = useState(true);
  const [password, setPassword] = useState("");

  function generatePassword() {
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
        backgroundColor: 'white',
        minHeight: { xs: 'auto', md: 234 },
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'visible'
      }}>
        <CardContent sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: { xs: 3, md: 4 },
            '&:last-child': { paddingBottom: { xs: 3, md: 4 } }
          }}>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                textAlign: 'center',
                color: '#009fe2'
              }}
            >
              Generate a simple (but usable) password.
            </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            mb: 2
          }}>
            <TextField
              id="generated-password"
              value={password}
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }
              }}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#eeeeee',
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#009fe2',
                    }
                  }
                }
              }}
            />
            <Button
              size='small'
              sx={{
                textTransform: 'none',
                textDecoration: 'underline',
                mt: 1,
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                color: '#009fe2',
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent',
                  color: '#0077b3'
                }
              }}
              onClick={() => setGenerateAdvancedPasswords(!generateAdvancedPasswords)}
            >
              {generateAdvancedPasswords ? '"It needs to be even simpler."' : '"No wait! I like added security!"' }
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <Button
              variant='contained'
              onClick={ generatePassword }
              endIcon={<RefreshIcon />}
              sx={{
                py: 1.5,
                px: { xs: 2, sm: 3 },
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                boxShadow: 2,
                borderRadius: { xs: 1, sm: '4px 0 0 4px' },
                backgroundColor: '#ff9900',
                '&:hover': {
                  backgroundColor: '#e68a00'
                }
              }}
            >
              Regenerate
            </Button>
            <Button
              variant='contained'
              onClick={copyPasswordToClipboard}
              endIcon={<ContentCopyIcon />}
              sx={{
                py: 1.5,
                px: { xs: 2, sm: 3 },
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                boxShadow: 2,
                borderRadius: { xs: 1, sm: '0 4px 4px 0' },
                backgroundColor: '#ff9900',
                '&:hover': {
                  backgroundColor: '#e68a00'
                }
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </CardContent>
      </Card>

    </div>

  );
  
}


function capitalizeString(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function randomAdjective() {
  let slug = generateSlug(1, {
    partsOfSpeech: ['adjective']
  });
  slug = capitalizeString(slug);
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
  slug = capitalizeString(slug);
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
  let password;
  let done = false;
  while (!done) {
    password = randomStaffPassword();
    if (password.length >= 15 && password.length <= 20) {
      if (zxcvbn(password).score >=3) {
        if (!BANNED_WORDS.some((word) => password.toLowerCase().includes(word))) {
          done = true;
        }
      }
    }
  }
  
  return password;
}

function randomAcceptableStudentPassword() {
  // Requirements for student passwords:
  //   - Must be 8 to 20 characters in length
  //   - Must have at least 1 numeric character
  //   - Must have at least 1 letter
  //   - Cannot be commonly used passwords (i.e. must be at least fairly strong, as judged by zxcvbn)
  //   - Cannot contain username or email

  let studentBannedWords = [
    "barista",
    "plump",
    "tinkling",
    "wet",
    "brown",
    "black",
    "knife",
    "army",
    "mealy",
    "dead",
    "putrid",
    "nigeria"
  ];

  let password;
  let done = false;
  while (!done) {
    password = randomStudentPassword().toLowerCase(); // making the generated password lowercase because capital letters are too hard for kids somehow
    if (password.length >= 8 && password.length <= 20) {
      if (zxcvbn(password).score >=4) {
        if (!studentBannedWords.some((word) => password.toLowerCase().includes(word)) && !BANNED_WORDS.some((word) => password.toLowerCase().includes(word))) { // using two different banned words lists, one specifically for students and one global
          done = true;
        }
      }
    }
  }

  return password;

}

function replacePassword() {
  let generatedPassword = document.getElementById("generated-password");
  generatedPassword.innerText = randomAcceptableStudentPassword();
}


function isUserOnAndroid() {
  return /Android/i.test(navigator.userAgent);
}


export default App;
