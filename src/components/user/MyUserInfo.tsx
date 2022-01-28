import { Grid, Typography, CircularProgress, Button } from "@mui/material"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { FetchError } from "../FetchError"
import { MyUserInfoCard } from "./MyUserInfoCard"

export const MyUserInfo = (props: MyUserInfoProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<boolean>(false)
  
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    setFetchError(false)
    setIsLoading(true)
    axios.get<User>('https://api.github.com/users/' + props.login)
    .then( (response) => {
      setUser(response.data)
    })
    .catch (e => {
      setFetchError(true)
      console.log(e)
    })
    .finally( () => {
      setIsLoading(false)
    })
  }

  return (
    <React.Fragment>
      <Grid container alignItems='center' justifyContent='center' textAlign='center'>
        <Grid item xs={12}>
          <Typography variant='h3'> User Details </Typography>
        </Grid>
        <Grid item marginTop='1.5em'>
          {fetchError && <FetchError/> }
          {isLoading && <CircularProgress/>}
          {user && <MyUserInfoCard user={user}/>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}