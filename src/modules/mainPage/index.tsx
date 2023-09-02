import React from "react"
import { Header } from "./components/Header"
// import { ImgCarousel } from "./components/ImgCarousel"
import { TiresInput } from "./components/TiresInput"
import { Footer } from "./components/footer/Footer"
import { Copyright } from "./components/footer/Copyright"

export function MainPage () {
    return (
        <>
            <Header />
            <TiresInput />
            <Footer />
        </>
    )
}