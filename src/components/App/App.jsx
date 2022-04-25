import { useEffect, useState} from 'react';

// components
import AppHeader from '../Header/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'

//config

import testListData from '../../utils/data';

const url = "https://norma.nomoreparties.space"
const path = "/api/ingredients"

// style for App.tsx is empty


function App() {

  const [datalistIngredients, setDataListIngredients] = useState(testListData)
  const [dataIngredients, setDataIngredients] = useState(testListData)

  const [success, setSuccess] = useState(false)

 

  useEffect(()=>{
    fetch(url+path)
      .then((response) => {return response.json()})
      .then( (reqest) => {
        setDataIngredients(reqest.data); 
        setSuccess(reqest.success);
      })
      .catch((e)=>{console.log(e)})

  }, [])

  return (
    <div className="App">
        <AppHeader/>
        {success &&
          <main>
            <BurgerIngredients 
              dataIngredients={dataIngredients} 
              openDetals={()=>{console.log(DetailsIngredients)}} 
            />
            <BurgerConstructor 
              listIngredients={datalistIngredients} 
              openDetails={()=>{console.log(OpenDetails)}} 
            />
          </main>
        }
          
    </div>
  );
}

export default App;