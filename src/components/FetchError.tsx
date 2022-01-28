import { Alert, Container } from "@mui/material"
import React from "react"

export const FetchError = () => {
  return (
    <React.Fragment>
      <Container sx={{mt: '1.25em'}}>
        <Alert sx={{width: '100%', textAlign: 'center'}} severity="error">HTTP Error</Alert>
      </Container>
    </React.Fragment>
  )
}