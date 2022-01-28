import React from "react"
import { HomePage } from "../pages/HomePage"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserPage } from "../pages/UserPage"
import { NotFound } from "../pages/NotFound"

export const Main = () => {
  return(
    <React.Fragment>
      <Routes>
        <Route path ='/' element={<HomePage/>}/>
        <Route path='/user/:login' element={<UserPage/>}/>
        <Route path='*' element={
          <Navigate to='/'/>
        }/>
      </Routes>
    </React.Fragment>
  )
}