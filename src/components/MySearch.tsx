import { Grid, Typography, TextField, Button } from "@mui/material"
import React, { useState } from "react"

export const MySearch = (props: MySearchProps) => {
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