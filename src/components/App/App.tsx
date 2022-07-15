import React, {FC, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory} from "react-router-dom";

import { ProtectedRoute } from "../ProtectedRoute/protectedRoute";
import { PublicRoute } from "../ProtectedRoute/PublicRoute";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { closeInfo, closeOrder } from "../../services/reducers/detals";
import AppHeader from '../Header/AppHeader'
import { 
  Shop, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  PageIngredient, 
  Orders, 
  Order, 
  
  FeedLent, 
  Feed 
} from '../../pages'
import { wsClose, wsStart } from "../../services/reducers/ws";
import { TRootState } from "../../services/store";




const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history.location.state as { from: {pathname: string} }
  const location = useLocation();
  
  const isOpenInfo = useSelector((store:TRootState)=>store.detals.isOpenInfo)

  const closeAllPopups = ()=>{
    
    dispatch(closeOrder());
    dispatch(closeInfo());
    history.goBack()
  }
  //console.log(history, location)

  return (
    <div className="App">
      <AppHeader/>
      
        <Switch location={location}>
          


          <Route path={"/feed/:id"}>
            
            { isOpenInfo ?(
            <> 
              <FeedLent />
              <Modal onClose={closeAllPopups}>
                <Order />
              </Modal>
            </>
            ):(
              <div className="mt-25">
              <Order />
              </div>
            )}
          </Route>  

          <Route path={"/feed/"}>
            <FeedLent />
          </Route>
          
          <ProtectedRoute path="/profile/orders/:id">
            { isOpenInfo?(
              <>
                <Orders/>
                <Modal onClose={closeAllPopups}>
                  <Order />
                </Modal>
              </>
              ):(
                <div className="mt-25">
                  <Order />
                </div>
              )
            }

          </ProtectedRoute> 
          <Route path="/profile/orders">
            <Orders/>
          </Route>

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
            {(history.location.state)?(
                (state.from.pathname === '/' && isOpenInfo)?(
                  <>
                    <Shop/>
                    <Modal onClose={closeAllPopups}>
                      <IngredientDetails/>
                    </Modal>
                  </>
                ):(
                  <PageIngredient/>
                )
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