import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './modules/mainPage';

function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat']
      }
    });
   }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}> 
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
