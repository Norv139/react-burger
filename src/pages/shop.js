
// components
import AppHeader from '../components/Header/AppHeader'
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients'

// modal
import Modal from '../components/Modal/Modal';

// Overlay
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';

// config
import { closeInfo, closeOrder } from '../services/reducers/detals';
import { useRedirect } from '../services/utils';


export function Shop() {
  const redirect = useRedirect()
  const dispatch = useDispatch()
  const {isOpenOrder, isOpenInfo } = useSelector(state => state.detals)

  const closeAllPopups = ()=>{
    
    dispatch(closeOrder());
    dispatch(closeInfo());
    redirect("/")
  }

  return (
    <>
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      { (isOpenOrder || isOpenInfo) &&
      <Modal onClose={closeAllPopups}>
              <OrderDetails/>
              <IngredientDetails/>
      </Modal>  
      } 
    </>
  );
}
