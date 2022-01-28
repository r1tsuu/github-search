import React from "react"
import { useParams } from "react-router-dom"
import { MyUserInfo } from "../components/user/MyUserInfo"

export const UserPage = () => {
  const { login } = useParams()
  return (
  <React.Fragment>
    {login && <MyUserInfo login={login}/> }
  </React.Fragment>
  )
}