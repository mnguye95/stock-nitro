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


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/journal' element={<ProtectedRoute><Journal/></ProtectedRoute>}/>
          {/* <Route path='/pricing-plans' element={<Pricing />}/>
          <Route path='/account' element={<ProtectedRoute><Dashboard view="Settings"/></ProtectedRoute>}/>
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
