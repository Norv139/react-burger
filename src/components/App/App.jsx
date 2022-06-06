import React from "react";

import AppHeader from '../Header/AppHeader'

import {
  Route,
  Switch
} from "react-router-dom";

import { ProtectedRoute, ProtectedRouteForLogin as ProtectedRouteFL } from "../protected-route";



import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile, PageIngredient  } from '../../pages'
import { useSelector } from "react-redux";

function App() {
  
  const pathUrl = useSelector(store=>store.user.previousPath)

  console.log(pathUrl)

  return (
    <div className="App">
      <AppHeader/>
      
       <Switch>
          <ProtectedRoute path="/" exact={true}>
            <Shop/>
          </ProtectedRoute> 

          <ProtectedRoute path="/ingredients/:id" exact={true}>
            {
              pathUrl[1] == null ? (
                <PageIngredient/>
              ):(
                <Shop/>
              )
            }

           
          </ProtectedRoute> 
          
          
          <ProtectedRoute path="/profile" exact={true}>
            <Profile/>
          </ProtectedRoute>
          
          <ProtectedRoute path="/profile/orders" exact={true}>
            <Login/>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            
          </ProtectedRoute> 

          

          <ProtectedRouteFL path="/login" exact={true}>
            <Login/>
          </ProtectedRouteFL>

          <ProtectedRouteFL path="/register" exact={true}>
            <Register/>
          </ProtectedRouteFL> 
          <ProtectedRouteFL path="/forgot-password" exact={true}>
            <ForgotPassword/>
          </ProtectedRouteFL> 

          <ProtectedRouteFL path="/reset-password" exact={true}>
            <ResetPassword/>
          </ProtectedRouteFL>

        </Switch>
        
        
    </div>
  )
}
export default App;