import React, { useEffect } from 'react';
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
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/item" element={<ItemDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
