import  {FC} from "react";
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
  FeedLent
} from '../../pages'

import { useAppDispatch, useAppSelector } from "../../services/utils/hooks";




const App: FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const state = history.location.state as { from: {pathname: string} }
  const location = useLocation();
  
  const isOpenInfo = useAppSelector(store=>store.detals.isOpenInfo)

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
                <FeedLent />
          </Route>

          <Route path={"/feed/"}>
            <FeedLent />
          </Route>


          <ProtectedRoute path={"/profile/orders/:id"}>
            <Orders/>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders">
              <Orders/>
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