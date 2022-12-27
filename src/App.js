import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import SignIn from './pages/signin';
import Journal from './pages/journal';
// import Dashboard from './pages/Dashboard';
// import Pricing from './pages/Pricing';
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/home';
import { AuthContextProvider } from './context/AuthContext';
import 'react-tooltip/dist/react-tooltip.css';
import 'reactjs-popup/dist/index.css';
import Features from './pages/features';
import Pricing from './pages/pricing';
import Demo from './pages/demo';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/journal' element={<ProtectedRoute><Journal/></ProtectedRoute>}/>
          <Route path='/features' element={<Features />}/>
          <Route path='/pricing' element={<Pricing />}/>
          <Route path='/demo' element={<Demo />}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
