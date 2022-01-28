import { Grid, CircularProgress, Button } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { MySearch } from "../components/MySearch"
import { MyListItemUser } from "../components/user/MyListItem"
import { MyUserInfo } from "../components/user/MyUserInfo"

export const HomePage = () => {
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
          <MyListItemUser onUserSelect={login => setSelectedUser(login)} users={users} /> 
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