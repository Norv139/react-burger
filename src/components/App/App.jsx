import { useEffect, useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

//config

import testListData from '../../utils/data';
import { CLOSE_INFO, CLOSE_ORDER } from '../../services/actions/detals';
import { GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, GET_ITEMS_REQUEST} from '../../services/actions/components';

const url = "https://norma.nomoreparties.space"
const path = "/api/ingredients"

// style for App.tsx is empty


function App() {
  const dispatch = useDispatch()
  const {isOpenInfo, isOpenOrder } = useSelector(state => state.detals)

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      dispatch({type:CLOSE_ORDER});
      dispatch({type:CLOSE_INFO})
    }
  }, [dispatch]);

  useEffect(()=>{
    document.addEventListener("keydown", escFunction);

    fetch(url+path)
    .then( (response) => {
      if (response.ok) { 
        dispatch({type: GET_ITEMS_REQUEST});
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then( (response) => {
      dispatch({type: GET_ITEMS_SUCCESS, items:response.data})
    })
    .catch( (error) => {
      console.log(error);
      dispatch({type: GET_ITEMS_FAILED})
    });

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction, dispatch])

  return (
    <div className="App">
        <AppHeader/>
          <main>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
         <ModalOverlay>
            {(isOpenInfo || isOpenOrder) &&
                <Modal>
                  <OrderDetails/>
                  <IngredientDetails/>
                </Modal>
             }   
         </ModalOverlay>
    </div>
  );
}

export default App;