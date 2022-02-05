import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Contact from './components/Contact';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);