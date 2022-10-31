import React, {useState} from 'react'
import './App.css';
import Bootstrap from './components/Bootstrap/Bootstrap'
import Routing from './components/Routing/Routing'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Categories from './components/Categories/Categories';
import ToDos from './components/Todos/ToDos';
import AuthProvider from './contexts/AuthContext';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home/Home';
import Header from './components/Header';
import Profile from './components/Auth/Profile';



function App() {

  // const [showContent, setShowContent] = useState('Home');

  return (
    <div className="App">
          {/* <Header setShowContent={setShowContent} />
          {showContent === 'Home' && <Home />}
          {showContent === 'Login' && <Login />} */}
      <AuthProvider>      
        <Router>
          <Navigation />
          <Routes>
            {/* <Route path='/'  element={<Login />} /> */}
            <Route path='/' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/toDos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            {/* <Route path='/toDos' element={<ToDos />} /> */}
            <Route path='*' element={ <NotFound />} />                                
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
