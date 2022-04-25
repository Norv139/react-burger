import { useEffect, useState, useCallback} from 'react';

// components
import AppHeader from '../Header/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

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
    if (event.keyCode === 27) {
      setOrderOpen(false);
      setIngridientInfo({})
    }
  }, []);

  useEffect(()=>{
    document.addEventListener("keydown", escFunction);

    fetch(url+path)
      .then((response) => {return response.json()})
      .then( (reqest) => {
        setDataIngredients(reqest.data); 
        setSuccess(reqest.success);
      })
      .catch((e)=>{console.log(e)})

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
        {orderOpen && 
          <OrderDetails setActive={()=>{setOrderOpen(false)}} />
          }
        {ingridientInfo.name !== undefined && 
          <IngredientDetails setActive={()=>(setIngridientInfo(false))} data={ingridientInfo} />
          }
          
    </div>
  );
}

export default App;