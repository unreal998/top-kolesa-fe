import { ReactNode } from 'react';

export type SliderItem = {
  imgSource: string;
  description: ReactNode;
  hoverDescription?: ReactNode;
};

export type CartItemData = {
  numberOfTires: number;
  name: string;
  image: string;
  tireId: number;
  article: number;
  fullName: string;
  price: number;
};

export type CartStorageData = {
  numberOfTires: number;
  tireId: number;
};
