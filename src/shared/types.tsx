import { ReactNode } from "react"

export type SliderItem = {
    imgSource: string,
    description: ReactNode,
    hoverDescription?: ReactNode,
}