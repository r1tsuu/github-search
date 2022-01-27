import { ThemeProvider } from '@emotion/react';
import { AppBar, Button, Card, CardMedia, Container, createMuiTheme, createTheme, CssBaseline, Grid, Input, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

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

interface MyItemProps {
  user: UserType
}
const MyItem = (props: MyItemProps) => {
  return(
    <React.Fragment>
      <Card sx={{":hover":{backgroundColor: 'silver', cursor: 'pointer'}}}>
        <Grid container maxHeight={100} textAlign='center' justifyContent='center'>
          <Grid item xs={3} >
          <img src={props.user.avatar_url} height='100'/>
          </Grid>
          <Grid container item xs={9} flexDirection={'column'} justifyContent='center'>
            <Grid item>
            <Typography align='center'>
              <b>{props.user.login}</b>
            </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  )
}

interface MyListItemProps {
  users: UserType[]
}
const MyListItem = (props: MyListItemProps) => {
  return(
    <React.Fragment>
      <Grid container spacing={7} alignItems={'center'} justifyContent={'center'}>
        {props.users.map(user => (
          <Grid item xs={12} md={4}>
            <MyItem user={user} key={user.login}/>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

interface MySearchProps {
  onSearch: (searchValue:string) => void
}

const MySearch = (props: MySearchProps) => {
  const [text, setText] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)
  
  const callback = () => {
    if (text.trim().length) {
      if (inputError) setInputError(false)
      props.onSearch(text)
      return
    }
    setInputError(true)
  }
  return(
    <React.Fragment>
      <Grid container textAlign='center'>
        <Grid item xs={12}>
          <Typography variant='h6'><b>Search by:</b> username</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...{error: inputError}}
            fullWidth 
            label='Value'
            helperText={inputError ? 'Incorrect entry': ''}
            variant='standard'
            value={text}
            onChange={e => setText(e.target.value)}
            ></TextField>
        </Grid>
        <Grid xs={12} marginTop='1em' item >
        <Button 
          fullWidth 
          variant='contained'
          onClick={callback}
          >Search</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}


type UserType = {
  login: string
  avatar_url: string

}

type ResponseSearchType = {
  items: UserType[]

}
const Main = () => {
  const [users, setUsers] = useState<UserType[]>([])

  const fetchUsers = (username:string) => {
    axios.get<ResponseSearchType>('https://api.github.com/search/users?q=' + username)
    .then(res => setUsers(res.data.items))
  }
  return(
    <React.Fragment>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item mt='5em'>
          <MySearch onSearch={(value) => fetchUsers(value)}/>
        </Grid>
        <Grid item mt='5em'>
          <MyListItem users={users}/>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

interface HeaderProps {
  currentMode: string
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>
}
const Header = (props: HeaderProps) => {
  return(
    <React.Fragment>
      <Toolbar sx={{textShadow: '1px 1px gray', borderBottom: 1, borderColor: 'divider', marginTop: '1.5em', textAlign: 'center'}}>
        <Grid container alignItems='center'>
          <Grid item xs={4}>
          <Button 
            variant='contained' 
            color={props.currentMode === 'users' ? 'primary': 'secondary'}
            fullWidth
            onClick={() => props.setCurrentMode('repositories')}
            sx={{fontFamily: 'serif'}}
            >Repositories</Button>
          </Grid>
          <Grid item xs={4} md={4}>
          <Typography
            fontFamily='serif'
            variant='h4'
            color="inherit"
            noWrap
            >
              Github Search
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <Button
              variant='contained'
              color={props.currentMode === 'users' ? 'secondary': 'primary'} 
              fullWidth
              onClick={() => props.setCurrentMode('users')}
              sx={{fontFamily: 'serif'}}
              >Users
              </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  )
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
