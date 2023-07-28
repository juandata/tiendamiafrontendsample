import React, { useState } from 'react';
import SendOrderService from '../services/SendOrderService';
import Products from './Products';
import { itemsMockData } from '../mockData/itemsMockData';
import { InterfaceCartProducts, InterfaceItems } from '../types';
import Box from '@mui/material/Box';
import StickyCart from './StickyCart';
import { addDaysFromDate } from '../utils';

const sticky = {
  top: 0,
  position: 'fixed',
  width: 'fit-content',
  right: '0px',
  padding: '50px',
  fontsize: '20px',
  zIndex: '1',
};

const AddOrder: React.FC = () => {
  const [products, setProducts] = useState<Array<InterfaceCartProducts>>([]);

  //@ts-ignore
  const sendOrder = (item: { product: InterfaceItems }) => {
    const d = new Date();
    const order = {
      createDate: d,
      status: 'Traveling',
      client: 'juandavidtabaresarce@gmail.com',
      shippingAddress: 'cll 21 n 27 56',
      shippingPromise: addDaysFromDate(d, +5),
      items: item,
    };
    SendOrderService.create(order)
      .then((response: any) => {
        console.log('response 0k:', response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      {/* @ts-ignore*/}
      <div style={sticky}>
        <StickyCart
          products={products}
          clearCart={() => setProducts([])}
          // @ts-ignore
          buy={(products: Array<InterfaceCartProducts>) => sendOrder(products)}
        />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {itemsMockData.map((item: InterfaceItems) => (
          <Products
            item={item}
            sendProducts={(product: InterfaceCartProducts) => {
              const productsCopy = [...products];
              productsCopy.push(product);
              setProducts(productsCopy);
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default AddOrder;
