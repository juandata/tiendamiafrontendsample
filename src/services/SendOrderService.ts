import http from '../http-common';
import {  InterfaceOrders } from '../types';

const getAll = () => {
  return http.get<Array<InterfaceOrders>>('/orders');
};
const create = (order: any) => {
  return http.post<InterfaceOrders>('/orders', order);
};



const SendOrderService = {
  getAll,
  create,
};

export default SendOrderService;
