import React from 'react'
import './App.css';
import Bootstrap from './components/Bootstrap/Bootstrap'
import Routing from './components/Routing/Routing'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Category from './components/Categories/Category';
import Todo from './components/Todos/Todo';
import AuthProvider from './contexts/AuthContext';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <div className="App">
      <AuthProvider>      
        <Router>
          <Navigation />
          <Routes>
            <Route path='/'  element={<Bootstrap />} />
            <Route path='/login' element={<Login />} />
            <Route path='/categories' element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path='/toDos' element={<Todo />} />
            <Route path='/routing' element={<ProtectedRoute><Routing /></ProtectedRoute>} />
            <Route path='*' element={ <NotFound />} />                                
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
