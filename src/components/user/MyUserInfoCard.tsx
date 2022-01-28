import { Grid, Typography, Button } from "@mui/material"
import { Link } from 'react-router-dom'
import React from "react"

export const MyUserInfoCard = (props: MyUserInfoCardProps) => {
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
          <Grid item xs={12} marginX='2.75rem' marginTop='1.25em'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button fullWidth sx={{fontSize: '1.25rem', fontWeight: 'bold'}} variant='contained'> Back </Button>
            </Link>
          </Grid>
        </Grid>
    </React.Fragment>
  )
}