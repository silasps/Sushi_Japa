import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../../contexts/CartContext';
import Details from './Details';

// Define a mock product object to use in tests
const mockProduct = {
  id: 1,
  name: 'Product Name',
  priceFormatted: 'R$ 10,00',
  description: 'Product Description',
  image: 'product-image.jpg'
};

// Create a mock CartContext value to use in tests
const mockCartContextValue = {
  addProduct: jest.fn()
};

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    state: mockProduct
  })
}));

describe('Details component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Details />
      </CartContext.Provider>
    );
  });

  it('renders the product details', () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.priceFormatted)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('increments the quantity when the plus button is clicked', () => {
    const plusButton = screen.getByLabelText('Increment quantity');
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decrements the quantity when the minus button is clicked', () => {
    const minusButton = screen.getByLabelText('Decrement quantity');
    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('adds the product to the cart when the add button is clicked', () => {
    const addProductButton = screen.getByText('Adicionar');
    fireEvent.click(addProductButton);
    expect(mockCartContextValue.addProduct).toHaveBeenCalledTimes(1);
    expect(mockCartContextValue.addProduct).toHaveBeenCalledWith({
      product: mockProduct,
      quantity: 1,
      observation: ''
    });
  });

  it('updates the observation state when the textarea value changes', () => {
    const observationTextarea = screen.getByPlaceholderText('Digite uma observação');
    const testObservation = 'Test observation';
    fireEvent.change(observationTextarea, { target: { value: testObservation } });
    expect(observationTextarea.value).toBe(testObservation);
  });
});
