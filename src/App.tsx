import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddOrder from './components/AddOrder';
import Orders from './components/Orders';
import Header from './components/Header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const buttonStyles = {
  backgroundColor: 'aliceblue',
  marginTop: '1rem',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#3c52b2',
  },
};
const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <nav>
          <Stack direction="row">
            <Button variant="contained" sx={buttonStyles}>
              <Link to={'/orders'} style={{ textDecoration: 'none' }}>
                Orders
              </Link>
            </Button>
            <Button variant="contained" sx={buttonStyles}>
              <Link to={'/products'} style={{ textDecoration: 'none' }}>
                Products
              </Link>
            </Button>
          </Stack>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<AddOrder />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
