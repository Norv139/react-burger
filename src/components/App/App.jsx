import React from "react";

import AppHeader from '../Header/AppHeader'

import {
  Route,
  Switch
  
} from "react-router-dom";


import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile  } from '../../pages'

function App() {
  return (
    <div className="App">
      <AppHeader/>

        <Switch>
          <Route path="/" exact={true}>
            <Shop/>
          </Route> 
          
          <Route path="/profile" exact={true}>
            <Profile/>
          </Route>
          
          <Route path="/profile/orders" exact={true}>
            <Login/>
          </Route>

          <Route path="/profile/orders/:id" exact={true}>
            <Login/>
          </Route> 

          

          <Route path="/login" exact={true}>
            <Login/>
          </Route>

          <Route path="/register" exact={true}>
            <Register/>
          </Route> 
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword/>
          </Route> 

          <Route path="/reset-password" exact={true}>
            <ResetPassword/>
          </Route>

        </Switch>
        
    </div>
  )
}
export default App;