import { useEffect, useState, useCallback} from 'react';

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

const url = "https://norma.nomoreparties.space"
const path = "/api/ingredients"

// style for App.tsx is empty


function App() {

  const [datalistIngredients, setDataListIngredients] = useState(testListData)
  const [dataIngredients, setDataIngredients] = useState(testListData)

  const [success, setSuccess] = useState(false)

  const [orderOpen, setOrderOpen] = useState(false)
  const [ingridientInfo, setIngridientInfo] = useState({})

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setOrderOpen(false);
      setIngridientInfo({})
    }
  }, []);

  useEffect(()=>{
    document.addEventListener("keydown", escFunction);

    fetch(url+path)
    .then( (response) => {
      if (response.ok) { 
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then( (response) => {
      setDataIngredients(response.data); 
      setSuccess(response.success);
    })
    .catch( (error) => {
      console.log(error);
    });

    return () => {
      document.removeEventListener("keydown", escFunction);
    };

  }, [escFunction])

  return (
    <div className="App">
        <AppHeader/>
        {success &&
          <main>
            <BurgerIngredients 
              dataIngredients={dataIngredients} 
              openDetals={setIngridientInfo} 
            />
            <BurgerConstructor 
              listIngredients={datalistIngredients} 
              openDetails={()=>{setOrderOpen(true)}} 
            />
          </main>
        }
         <ModalOverlay>
              {orderOpen &&
                <Modal setActive={()=>{setOrderOpen(false)}}>
                  <OrderDetails setActive={()=>{setOrderOpen(false)}} />
                </Modal>
                }
              {ingridientInfo.name !== undefined && 
                <Modal setActive={()=>{setIngridientInfo({})}}z>
                  <IngredientDetails 
                    setActive={()=>{setIngridientInfo({})}}
                    data={ingridientInfo}/>
                </Modal>
              }
         </ModalOverlay>
    </div>
  );
}

export default App;