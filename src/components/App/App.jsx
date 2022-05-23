
// components
import AppHeader from '../Header/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

//modal

import ModalOverlay from '../ModalOverlay/ModalOverlay';
import Modal from '../Modal/Modal';

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
         <Modal>
           { (isOpenOrder || isOpenInfo) &&
            <ModalOverlay fnClose={fnclose}>
                  <OrderDetails/>
                  <IngredientDetails/>
            </ModalOverlay>  } 
         </Modal>
    </div>
  );
}

export default App;