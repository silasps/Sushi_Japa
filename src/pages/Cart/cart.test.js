import React from 'react';
import { render } from '@testing-library/react';
import Cart from '.';
import { CartProvider } from '../../contexts/CartContext';

describe('Cart component', () => {
  it('should render cart items', () => {
    const cartItems = [
      {
        itemId: 1,
        product: {
          name: 'Product 1',
          image: 'http://localhost:3000/image1.jpg'
        },
        subTotalFormatted: 'R$ 50,00'
      },
      {
        itemId: 2,
        product: {
          name: 'Product 2',
          image: 'http://localhost:3000/image2.jpg'
        },
        subTotalFormatted: 'R$ 75,00'
      }
    ];
    const totalCart = {
      totalFormatted: 'R$ 125,00'
    };

    const { getByTestId, getByText } = render(
      <CartProvider value={{ cart: cartItems, totalCart }}>
        <Cart />
      </CartProvider>
    );

    // eslint-disable-next-line no-restricted-globals
    const tableCart = screen.getByTestId('table-cart');
    expect(tableCart).toBeInTheDocument();

    // eslint-disable-next-line no-restricted-globals
    const product1Name = screen.getByText('Product 1');
    expect(product1Name).toBeInTheDocument();

    // eslint-disable-next-line no-restricted-globals
    const product2Name = screen.getByText('Product 2');
    expect(product2Name).toBeInTheDocument();

    // eslint-disable-next-line no-restricted-globals
    const total = screen.getByText('Total: R$ 125,00');
    expect(total).toBeInTheDocument();
  });
});
