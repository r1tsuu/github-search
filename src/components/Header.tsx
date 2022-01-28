import { Toolbar, Grid, Button, Typography } from "@mui/material"
import React from "react"

export const Header = (props: HeaderProps) => {
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