import React, {FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory} from "react-router-dom";

import { ProtectedRoute } from "../ProtectedRoute/protectedRoute";
import { PublicRoute } from "../ProtectedRoute/PublicRoute";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { closeInfo, closeOrder } from "../../services/reducers/detals";
import AppHeader from '../Header/AppHeader'
import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile, PageIngredient  } from '../../pages'


interface IRootStore {
  user:{
    previousPath:string|null[];
    isLogin: boolean
  }
  detals:{
    isOpenInfo: boolean
  }
}

interface IBackground{
  location:{
    state:{
      background: any;
    }
  }
}

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let location = useLocation();
  
  const isLogin = useSelector((store:IRootStore)=>store.user.isLogin)
  const isOpenInfo = useSelector((store:IRootStore)=>store.detals.isOpenInfo)

  const closeAllPopups = ()=>{
    
    dispatch(closeOrder());
    dispatch(closeInfo());
    history.push('/')
  }

  return (
    <div className="App">
      <AppHeader/>
      
        <Switch location={location}>
          
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
            {(isOpenInfo)?(
                <>
                  <Shop/>
                  <Modal onClose={closeAllPopups}>
                    <IngredientDetails/>
                  </Modal>
                </>
              ):(
                <PageIngredient/>
              )}
          </Route> 

          <Route path={"/"}>
            <Shop/>
          </Route> 

        </Switch>
        

    </div>
  )
}
export default App;