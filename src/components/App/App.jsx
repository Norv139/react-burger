
// components
import AppHeader from '../Header/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

//modal

import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

// Overlay
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';

//config

import { CLOSE_INFO, CLOSE_ORDER } from '../../services/actions/detals';



function App() {
  const dispatch = useDispatch()
  const {isOpenOrder, isOpenInfo } = useSelector(state => state.detals)

  const fnclose =()=>{
    dispatch({type:CLOSE_ORDER});
    dispatch({type:CLOSE_INFO})
  }

  return (
    <div className="App">
        <AppHeader/>
          <main>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
         <ModalOverlay>
           { (isOpenOrder || isOpenInfo) &&
            <Modal fnClose={fnclose}>
                  <OrderDetails/>
                  <IngredientDetails/>
            </Modal>  } 
         </ModalOverlay>
    </div>
  );
}

export default App;