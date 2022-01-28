import { ThemeProvider } from '@emotion/react';
import { AppBar, Button, Card, CardMedia, CircularProgress, Container, createMuiTheme, createTheme, CssBaseline, Grid, Input, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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

type User = {
  login: string,
  id: number,
  avatar_url: string,
  html_url: string,
  followers: number,
  following: number,
}

interface MyUserInfoCardProps {
  user: User
}
const MyUserInfoCard = (props: MyUserInfoCardProps) => {
  const openGithubUserPage = () => {
    window.open(props.user.html_url)
  }
  return (
    <React.Fragment>
        <Grid container justifyContent='center' alignItems='center' maxWidth='380px'>
          <Grid item xs={12}>
            <img src={props.user.avatar_url} height={'300px'}/>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight='bold' fontSize='2rem'>{props.user.login}</Typography>
          </Grid>
          <Grid container item alignItems='center' justifyContent='center' textAlign='center'>
            <Grid item xs={6} >
            <Typography fontWeight='bold' fontSize='1.5rem'>Followers:</Typography>
            </Grid>
            <Grid item xs={6} >
            <Typography  fontWeight='bold' fontSize='1.5rem'>{props.user.followers}</Typography>
            </Grid>
            <Grid item xs={6} >
            <Typography fontWeight='bold'  fontSize='1.5rem'>Followin:</Typography>
            </Grid>
            <Grid item xs={6} >
            <Typography fontWeight='bold'  fontSize='1.5rem'>{props.user.following}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography fontWeight='bold'  fontSize='1.5rem'>Id:</Typography>
            </Grid>
            <Grid item  xs={6}>
            <Typography fontWeight='bold'  fontSize='1.5rem'>{props.user.id}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} marginX='2.75rem' marginTop='1.25em'>
          <Button fullWidth sx={{fontSize: '1.25rem', fontWeight: 'bold'}} variant='contained' onClick={openGithubUserPage}>Visit Page</Button>
          </Grid>
        </Grid>
    </React.Fragment>
  )
}

interface MyUserInfoProps {
  login: string
}
const MyUserInfo = (props: MyUserInfoProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    axios.get<User>('https://api.github.com/users/' + props.login)
    .then( (response) => {
      setUser(response.data)
    })
    .then(() => setIsLoading(false))
    setIsLoading(true)
  }

  return (
    <React.Fragment>
      <Grid container alignItems='center' justifyContent='center' textAlign='center'>
        <Grid item xs={12}>
          <Typography variant='h3'> User Details </Typography>
        </Grid>
        <Grid item marginTop='1.5em'>
          {isLoading && <CircularProgress/>}
          {user && <MyUserInfoCard user={user}/>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

interface MyItemProps {
  user: UserSearchType
  onUserSelect: (username: string) => any
}
const MyItem = (props: MyItemProps) => {
  const test = () => props.onUserSelect(props.user.login)
  return(
    <React.Fragment>
      <Card
        sx={{":hover":{backgroundColor: 'silver', cursor: 'pointer'}}}
        onClick={test}
        >
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
  users: UserSearchType[]
  onUserSelect: (username: string) => any
}
const MyListItem = (props: MyListItemProps) => {
  return(
    <React.Fragment>
      <Grid container spacing={7} alignItems={'center'} justifyContent={'center'}>
        {props.users.map(user => (
          <Grid item xs={12} md={4}>
            <MyItem onUserSelect={props.onUserSelect} user={user} key={user.login}/>
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
          sx={{fontSize: '1.25rem', fontWeight: 'bold'}}
          >Search</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}


type UserSearchType = {
  login: string
  avatar_url: string

}

type ResponseSearchType = {
  items: UserSearchType[]

}

const Main = () => {
  const [users, setUsers] = useState<UserSearchType[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const goBack = () => setSelectedUser(null)

  const fetchUsers = (username:string) => {
    axios.get<ResponseSearchType>('https://api.github.com/search/users?q=' + username)
    .then(res => setUsers(res.data.items))
    .then(() => setIsLoading(false))
    setIsLoading(true)
  }
  return(
    <React.Fragment>
      {!selectedUser ?
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item mt='5em'>
          <MySearch onSearch={(value) => fetchUsers(value)}/>
        </Grid>
        <Grid item mt='5em'>
          {isLoading && <CircularProgress/>}
          <MyListItem onUserSelect={login => setSelectedUser(login)} users={users} /> 
        </Grid>
      </Grid>
      :
      <Grid container justifyContent='center' alignItems='center' >
        <Grid item mt='5em' xs={12}>
          <MyUserInfo login={selectedUser}/>
        </Grid>
        <Grid item marginTop='1.25em'>
        <Button 
        sx={{width: '292px', fontSize: '1.25rem', fontWeight: 'bold'}}
          variant='contained'
          onClick={goBack}
          >Back to users list</Button> 
        </Grid>
      </Grid>
    }
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
      <Toolbar sx={{ color: 'antiquewhite', borderBottom: 1, borderColor: 'divider', marginTop: '1.5em', textAlign: 'center'}}>
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
