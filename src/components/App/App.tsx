import React, {FC} from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";

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

  const pathUrl : string|null[] = useSelector((store:IRootStore)=>store.user.previousPath)

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