import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './modules/mainPage';
import { ShopPage } from './modules/shopPage';
import { Header } from './shared/components/header/Header';
import { Footer } from './shared/components/footer/Footer';
import { ItemDetailsPage } from './modules/itemDetailsPage';
import { CheckoutPage } from './modules/checkoutPage';
import { ContactPage } from './modules/contactPage';
import { OrderPage } from './modules/orderPage';
import './App.css';
import AboutPage from './modules/aboutPage';
import ErrorPage from './modules/errorPage';
import { useSelector } from 'react-redux';
import { selectFilterData } from './modules/mainPage/selectors';
import { Box } from '@mui/material';
import Loader from './shared/components/Loader';
import { BASE_COLORS } from './shared/constants';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/item" element={<ItemDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
