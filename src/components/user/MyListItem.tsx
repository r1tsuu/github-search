import { Grid } from "@mui/material"
import React from "react"
import { MyItemUser } from "./MyItem"

export const MyListItemUser = (props: MyListItemProps) => {
  return(
    <React.Fragment>
      <Grid container spacing={7} alignItems={'center'} justifyContent={'center'}>
        {props.users.map(user => (
          <Grid item xs={12} md={4}>
            <MyItemUser user={user} key={user.login}/>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}