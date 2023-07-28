import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { render } from '@testing-library/react';

import App from './App';

describe('Render the App component', () => {
  it('Should render the App component correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const ordersButton = getByText('Orders');
    const productsButton = getByText('Products');

    expect(ordersButton).toBeInTheDocument();
    expect(productsButton).toBeInTheDocument();
  });
});
