import React from "react";

import AppHeader from '../Header/AppHeader'

import {
  BrowserRouter as Router,
  Routes,
  Route, 
  
} from "react-router-dom";


import { Shop, Login, Register, ForgotPassword, ResetPassword, Profile  } from '../../pages'

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Router>

        <Routes>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        <Routes>
          <Route path="/profile/orders" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path="/profile/orders/:id" element={<Login/>}/>
        </Routes>

        

        <Routes>
          <Route path="/shop" element={<Shop/>}/>
        </Routes>

        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword/>}/>
        </Routes>

      </Router>
    </div>
  )
}
export default App;