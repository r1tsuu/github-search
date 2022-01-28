import { Card, Grid, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import React from "react"

export const MyItemUser = (props: MyItemProps) => {
  return(
    <React.Fragment>
      <Link to={`/user/${props.user.login}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{":hover":{backgroundColor: 'silver', cursor: 'pointer'}}}
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
      </Link>
    </React.Fragment>
  )
}