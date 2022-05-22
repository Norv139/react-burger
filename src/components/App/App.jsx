
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




function App() {

  return (
    <div className="App">
        <AppHeader/>
          <main>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
         <ModalOverlay>
                <Modal>
                  <OrderDetails/>
                  <IngredientDetails/>
                </Modal>
         </ModalOverlay>
    </div>
  );
}

export default App;