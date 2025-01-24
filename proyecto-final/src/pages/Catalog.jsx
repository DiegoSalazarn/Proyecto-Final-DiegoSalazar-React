import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../products';
import ProductCard from './ProductCard';

const validCategories = ['remeras', 'pantalones', 'buzos'];

function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!validCategories.includes(categoryId)) {
      navigate('/404');
    }
  }, [categoryId, navigate]);

  const filteredProducts = products.filter(product => product.category === categoryId);

  return (
    <div>
      <h2>Catálogo de {categoryId}</h2>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
