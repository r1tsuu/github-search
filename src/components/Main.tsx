import { Grid, CircularProgress, Button } from "@mui/material"
import React from "react"
import axios from "axios"
import { useState } from "react"
import { MyListItemUser } from "./user/MyListItem"
import { MyUserInfo } from "./user/MyUserInfo"
import { MySearch } from "./MySearch"
import { HomePage } from "../pages/HomePage"

export const Main = () => {
  const [users, setUsers] = useState<UserSearchType[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const goBack = () => setSelectedUser(null)

  const fetchUsers = (username:string) => {
    axios.get<ResponseSearchType>('https://api.github.com/search/users?q=' + username)
    .then(res => setUsers(res.data.items))
    .then(() => setIsLoading(false))
    setIsLoading(true)
  }
  return(
    <React.Fragment>
      <HomePage/>
    </React.Fragment>
  )
}