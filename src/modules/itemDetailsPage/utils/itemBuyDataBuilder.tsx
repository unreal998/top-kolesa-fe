import { CheckoutItemData, UserData } from '../../../shared/types';
import { OrderItemProps, PRODUCT_TYPE } from '../types';

export function itemBuyDataBuilder(
  itemData: CheckoutItemData[],
  userData: UserData,
): OrderItemProps[] {
  const orderData = itemData.map((item) => {
    return {
      modelId: item.tireId,
      sizeId: item.size_id,
      size: `${
        item.width
      }/${item.height.toString()}R${item.diametr.toString()} \n ${item.weight}${
        item.speed
      }`,
      userId: 0,
      statusId: 0,
      customerId: 0,
      brand: item.brand,
      brandId: item.brand_id,
      locationId: 0,
      supplierId: item.supplier_id,
      paymentId: 0,
      paymentCost: '0.00',
      cityId: 0,
      paymentStatusId: 0,
      shipCompId: 0,
      paymentCostType: 0,
      paymentComment: userData.comment,
      shipmentId: 0,
      shipmentCost: '0.00',
      shipmentCostType: 0,
      driverId: 0,
      shipmentComment: 'test shipment comment',
      shipmentCompId: 0,
      driverCost: 0,
      driverCostType: 0,
      otherCost: 0,
      otherCostType: 0,
      otherCostName: '',
      discount: 0,
      sellSum: 0,
      profit: 0,
      nameFirm: 'test name firm',
      name: userData.userName,
      tireName: item.name,
      phone: userData.phone,
      phoneIndex: '+380',
      prepay: 0,
      country: item.country,
      year: item.year,
      inWarehous: 0,
      email: userData.email,
      addressCity: userData.city,
      address: userData.address,
      shipment: '0000-00-00 00:00:00',
      productType: PRODUCT_TYPE.TIRE,
      quantity: item.numberOfTires, // USER BUY COUNT
      priceBuy: item.price_uah,
      priceSell: item.price_uah,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shipmentFrom: '0000-00-00 00:00:00',
      shipmentUntil: '0000-00-00 00:00:00',
      comment: userData.comment + ' test comment DEVELOP!!!!!',
      source: 'new site develop',
      referer: 'localhost',
      forPrint: 0,
      forExport: 0,
      checkNum: 0,
      checkDate: '0000-00-00 00:00:00',
      checkPayer: '',
      paymentType: 'Null',
      politicsCheckBox: 0,
      smsText: '',
      smsSendAt: '0000-00-00 00:00:00',
    };
  });
  return orderData;
}
