import React from "react";

import AppHeader from '../Header/AppHeader'

import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import { ProtectedRoute, PublicRoute } from "../protected-route";



import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile, PageIngredient  } from '../../pages'
import { useSelector } from "react-redux";

function App() {

  const pathUrl = useSelector(store=>store.user.previousPath)

  return (
    <div className="App">
      <AppHeader/>
      
       <Switch>
          <ProtectedRoute path="/" exact={true}>
            <Shop/>
          </ProtectedRoute> 

          <ProtectedRoute path="/ingredients/:id" exact={true}>
            {
              pathUrl[1] == null  ? (
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
            <>orders</>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <>orders id</>
          </ProtectedRoute> 

          

          <PublicRoute path="/login" exact={true}>
            <Login/>
          </PublicRoute>

          <PublicRoute path="/register" exact={true}>
            <Register/>
          </PublicRoute> 

          <PublicRoute path="/forgot-password" exact={true}>
            <ForgotPassword/>
          </PublicRoute> 

          <PublicRoute path="/reset-password" exact={true}>
            <ResetPassword/>
          </PublicRoute>
        </Switch>
        
        
    </div>
  )
}
export default App;