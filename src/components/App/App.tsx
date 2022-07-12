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


interface IRootStore {
  detals:{
    isOpenInfo: boolean
  }
}

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history.location.state as { from: {pathname: string} }
  const location = useLocation();
  
  const isOpenInfo = useSelector((store:IRootStore)=>store.detals.isOpenInfo)

  const closeAllPopups = ()=>{
    
    dispatch(closeOrder());
    dispatch(closeInfo());
    history.push('/')
  }
  
  useEffect(()=>{
    dispatch(wsStart('wss://norma.nomoreparties.space/orders/all'))
    return ()=>{
      dispatch(wsClose('null'))}
  },[])

  //console.log(history, location)

  return (
    <div className="App">
      <AppHeader/>
      
        <Switch location={location}>
          

          <Route path={"/feed/"}>
            <FeedLent />
          </Route>
          <Route path={"/feed/:id"}>
            <Feed/>
          </Route>
          
          <Route path="/profile/orders">
            <Orders/>
          </Route>
          <ProtectedRoute path="/profile/orders/:id">
            <Order />
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