import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

import { CartContext } from "../../contexts/CartContext";

const Menu = () => {
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  return (

    <header className="menu">
      <div className="menu-content">
        <h1>Sushi Lab</h1>

        <ul>
          <li onClick={() => navigate('/cart')}>
            <FaCartPlus color="#fff" />
            {` ${cart.length}`} items
          </li>
        </ul>
      </div>
    </header>

  );
};

export default Menu;
