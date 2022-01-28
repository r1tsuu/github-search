import { Card, Grid, Typography } from "@mui/material"
import React from "react"

export const MyItemUser = (props: MyItemProps) => {
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