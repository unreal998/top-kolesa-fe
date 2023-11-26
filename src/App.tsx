import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./modules/mainPage";
import { ShopPage } from "./modules/shopPage";
import { Header } from "./shared/components/Header";
import { Footer } from "./shared/components/footer/Footer";
import { ItemDetailsPage } from "./modules/itemDetailsPage";
import { CheckoutPage } from "./modules/checkoutPage";
import "./App.css";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat"],
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
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;