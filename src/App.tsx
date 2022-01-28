import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Container } from "@mui/material";
import { useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import './App.css'

const theme = createTheme()

theme.typography.h4 = {
  fontSize: '2.4rem',
  [theme.breakpoints.only('md')]: {
    fontSize: '2rem'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '1.35rem'
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '0.9rem'
  }
}

function App() {
  const [currentMode, setCurrentMode] = useState<string>('users')
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <header>
        <Container maxWidth='lg'>
          <Header currentMode={currentMode} setCurrentMode={setCurrentMode}/>
        </Container>
        </header>
        <main>
          <Container>
            <Main/>
          </Container>
        </main>
      </ThemeProvider>

  );
}

export default App;
