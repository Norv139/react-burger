import React from 'react';
import { useEffect, useState } from 'react';

// components
import AppHeader from './components/Header/AppHeader'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'

import './App.css';

//API config
const url = "https://norma.nomoreparties.space"
const path = "/api/ingredients"
//

function App() {
  const testData = [
    {"_id":"60d3b41abdacab0026a733c6","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733ce","name":"Соус традиционный галактический","type":"sauce","proteins":42,"fat":24,"carbohydrates":42,"calories":99,"price":15,"image":"https://code.s3.yandex.net/react/code/sauce-03.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733c9","name":"Мясо бессмертных моллюсков Protostomia","type":"main","proteins":433,"fat":244,"carbohydrates":33,"calories":420,"price":1337,"image":"https://code.s3.yandex.net/react/code/meat-02.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733d0","name":"Хрустящие минеральные кольца","type":"main","proteins":808,"fat":689,"carbohydrates":609,"calories":986,"price":300,"image":"https://code.s3.yandex.net/react/code/mineral_rings.png","image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png","image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733d0","name":"Хрустящие минеральные кольца","type":"main","proteins":808,"fat":689,"carbohydrates":609,"calories":986,"price":300,"image":"https://code.s3.yandex.net/react/code/mineral_rings.png","image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png","image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png","__v":0},
  ]

  const [data, setData] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    fetch(url+path)
    .then((response) => {return response.json()})
    .then((reqest) => {setData(reqest.data); setSuccess(reqest.success)})
    .catch((e)=>{console.log(e)})
  }, [])

  return (
    <div className="App">
        <AppHeader/>
        <div className='mainConteiner'>
          { success && <BurgerConstructor data={data} />}
          <BurgerIngredients dataList={testData} />
        </div>

    </div>
  );
}

export default App;
