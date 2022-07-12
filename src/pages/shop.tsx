
// components
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
import { useHistory, useLocation } from 'react-router-dom';
import { TRootState } from '../services/store';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>): ReactElement<any, any> | null;
  }
}


export const Shop: React.FC = () => {

  const location = useLocation();
  const history = useHistory();
  
  const dispatch = useDispatch();
  const {isOpenOrder} = useSelector((state:TRootState) => state.detals)
  

  const closeAllPopups = ()=>{

    dispatch(closeOrder());
    dispatch(closeInfo());
    history.push({ pathname: "/", state: { from: location } })
  }
  return ( 
    <>
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      { 
        isOpenOrder &&
        <Modal onClose={closeAllPopups}>
                <OrderDetails/>
        </Modal>  
      } 
    </>
  );
}
