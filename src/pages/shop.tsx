
// components
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients'

// modal
import Modal from '../components/Modal/Modal';

// Overlay
import OrderDetails from '../components/OrderDetails/OrderDetails';


// config
import { closeInfo, closeOrder } from '../services/reducers/detals';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../services/utils/hooks';

import styles from "./styles.module.css"

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>): ReactElement<any, any> | null;
  }
}


export const Shop: React.FC = () => {

  const location = useLocation();
  const history = useHistory();
  
  const dispatch = useAppDispatch();
  const {isOpenOrder} = useAppSelector((state) => state.detals)
  const orderRequest = useAppSelector((state) => state.detals.orderRequest)

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
        orderRequest &&
        <Modal onClose={()=>{}}>
          <span className=' m-15'>
              <h1 className={` text text_type_main-large mr-10 mb-8`}>
                Ожидайте
              </h1>
              <p className={` text text_type_main-default`}>
                Заказ обрабатывается 
              </p>
          </span>
        </Modal>  
      } 
      { 
        isOpenOrder &&
        <Modal onClose={closeAllPopups}>
                <OrderDetails/>
        </Modal>  
      } 
    </>
  );
}
