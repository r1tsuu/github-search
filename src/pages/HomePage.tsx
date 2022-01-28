import { Grid, CircularProgress, Button } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { FetchError } from "../components/FetchError"
import { MySearch } from "../components/MySearch"
import { MyListItemUser } from "../components/user/MyListItem"
import { MyUserInfo } from "../components/user/MyUserInfo"

export const HomePage = () => {
  const [users, setUsers] = useState<UserSearchType[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const goBack = () => setSelectedUser(null)

  const fetchUsers = (username:string) => {
    setFetchError(false)
    axios.get<ResponseSearchType>('https://api.github.com/search/users?q=' + username)
    .then(res => setUsers(res.data.items))
    .catch((e) => {
      setFetchError(true)
    })
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }
  return(
    <React.Fragment>
      {!selectedUser ?
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item mt='5em' justifyContent='center'>
          <MySearch onSearch={(value) => fetchUsers(value)}/>
          {fetchError && <FetchError/> }
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
      </Grid>
    }
    </React.Fragment>
  )
}