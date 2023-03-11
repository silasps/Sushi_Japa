
import { useContext } from 'react';

import { CartContext } from '../../contexts/CartContext';

const Cart = () => {

  const { cart, totalCart } = useContext(CartContext)

  return (
    <>

      <div className='main-container'>
        <table className='table-cart' data-testid="table-cart">
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.itemId}>
                <td>
                  <img className='table-image' src={item.product.image} alt={item.product.name} />
                </td>
                <td>{item.product.name}</td>
                <td>{item.subTotalFormatted}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='footer-cart'>
          <h1>Total: {totalCart.totalFormatted}</h1>
        </div>
      </div>
    </>
  )
}

export default Cart
