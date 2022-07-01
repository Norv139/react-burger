import React, {FC} from "react";
import { useSelector } from "react-redux";
import { Switch, Route} from "react-router-dom";

import { ProtectedRoute } from "../ProtectedRoute/protectedRoute";
import { PublicRoute } from "../ProtectedRoute/PublicRoute";

import AppHeader from '../Header/AppHeader'
import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile, PageIngredient  } from '../../pages'

interface IRootStore {
  user:{
    previousPath:string|null[]
  }
}

const App: FC = () => {

  const pathUrl = useSelector((store:IRootStore)=>store.user.previousPath)

  return (
    <div className="App">
      <AppHeader/>
      
        <Switch>
          
          <ProtectedRoute path="/profile/orders/:id">
            <>orders id</>
          </ProtectedRoute> 
          
          <ProtectedRoute path="/profile/orders">
            <>orders</>
          </ProtectedRoute>

          <ProtectedRoute path="/profile" >
            <Profile/>
          </ProtectedRoute>


          <PublicRoute path="/login" >
            <Login/>
          </PublicRoute>

          <PublicRoute path="/register">
            <Register/>
          </PublicRoute> 

          <PublicRoute path="/forgot-password">
            <ForgotPassword/>
          </PublicRoute> 

          <PublicRoute path="/reset-password">
            <ResetPassword/>
          </PublicRoute>

          <Route path={"/ingredients/:id"} >
            {
              pathUrl[1] == null  ? (
                <PageIngredient/>
              ):(
                <Shop/>
              )
            }
          </Route> 

          <Route path={"/"}>
            <Shop/>
          </Route> 

        </Switch>
    </div>
  )
}
export default App;