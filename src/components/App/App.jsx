import React from "react";

import AppHeader from '../Header/AppHeader'

import {
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import { ProtectedRoute, ProtectedRouteForLogin as ProtectedRouteFL } from "../protected-route";



import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile, PageIngredient  } from '../../pages'
import { useSelector } from "react-redux";

function App() {

  const pathUrl = useSelector(store=>store.user.previousPath)
  const { isOpenOrder } = useSelector(state => state.detals)

  return (
    <div className="App">
      <AppHeader/>
      
       <Switch>
          <ProtectedRoute path="/" exact={true}>
            <Shop/>
          </ProtectedRoute> 

          <Route path="/ingredients/:id" exact={true}>
            {
              pathUrl[1] == '/' && !isOpenOrder  ? (
                <PageIngredient/>
              ):(
                <Shop/>
              )
            }
          </Route> 
          
          <ProtectedRoute path="/profile" exact={true}>
            <Profile/>
          </ProtectedRoute>
          
          <ProtectedRoute path="/profile/orders" exact={true}>
            <>orders</>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <>orders id</>
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