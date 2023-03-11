import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { priceFormat } from "../../utils/priceFormat";
import { productsActions } from "../../actions/product.action";

import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  const handleNavigateToDetails = (product) => {
    navigate('/details', { state: product })
  }

  useEffect(() => {
    productsActions.getProductsAction()
      .then((response) => {
        setProducts(response.data.map((item) => {
          return {
            ...item,
            priceFormatted: priceFormat(item.price)
          }
        }))
      })
      .catch(() => toast.error('Houve um erro ao buscar os produtos :('))
  }, [])


  return (
    <div>
      <div className="main-container">
        <div className="products-list">
          {products.map((product) => (
            <ProductCard product={product}
              onClick={() => handleNavigateToDetails(product)}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
