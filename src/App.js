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
          {/* <Route path='/account' element={<ProtectedRoute><Dashboard view="Settings"/></ProtectedRoute>}/>
          <Route path='/audit' element={<ProtectedRoute><Dashboard view="SEO Audit"/></ProtectedRoute>}/>
          <Route path='/meta-generator' element={<ProtectedRoute><Dashboard view="Meta Generator"/></ProtectedRoute>}/>
          <Route path='/suggestions' element={<ProtectedRoute><Dashboard view="Blog Suggestions"/></ProtectedRoute>}/>
          <Route path='/image-geotag' element={<ProtectedRoute><Dashboard view="Image Local Geotag"/></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/> */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
