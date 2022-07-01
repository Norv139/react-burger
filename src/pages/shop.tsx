
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
import { useRedirect } from '../services/utils';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>): ReactElement<any, any> | null;
  }
}

interface IState{
  detals:{
    isOpenOrder: boolean;
    isOpenInfo: boolean;
  }
}

export const Shop: React.FC = () => {
  const redirect = useRedirect()
  const dispatch = useDispatch()
  const {isOpenOrder, isOpenInfo } = useSelector((state:IState) => state.detals)
  

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
      { 
        (isOpenOrder || isOpenInfo) &&
        <Modal onClose={closeAllPopups}>
                <OrderDetails/>
                <IngredientDetails/>
        </Modal>  
      } 
    </>
  );
}
