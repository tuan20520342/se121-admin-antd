import * as UrlApi from '../url';
import baseRequest from './BaseRequest';

export const OrderService = {
  getOrders: () => {
    return baseRequest.get(UrlApi.URL_ORDERS);
  },
  getOrderById: (id) => {
    return baseRequest.get(UrlApi.URL_ORDERS_ID(id));
  },
  updateOrderStatus: (id, status) => {
    return baseRequest.put(UrlApi.URL_UPDATE_ORDER_STATUS(id), {
      status: status,
    });
  },
};
