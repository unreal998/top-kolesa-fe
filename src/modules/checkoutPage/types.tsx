export type CityListData = {
  Present: string;
  MainDescription: string;
  Area: string;
  Region: string;
};

export type AutocompleateData = {
  title: string;
};

export type CityListResponceData = {
  TotalCount: number;
  Addresses: CityListData[];
};

type WarehouseData = {
  Description: string;
};

export type CityListResponce = {
  data: CityListResponceData[];
};

export type WarehouseListResponce = {
  data: WarehouseData[];
};
