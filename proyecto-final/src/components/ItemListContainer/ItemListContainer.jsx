import './ItemListContainer.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import ProductCard from "../ProductCard/ProductCard";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsRef = collection(db, "products");
        const q = categoryId ? query(productsRef, where("category", "==", categoryId)) : productsRef;

        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(" Productos obtenidos desde Firebase:", productList);
        setProducts(productList);
      } catch (error) {
        console.error(" Error al obtener productos desde Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2>{greeting}</h2>
      {loading ? <p>Cargando productos...</p> : (
        <div className="row">
          {products.length > 0 ? products.map(product => (
            <ProductCard key={product.id} product={product} />
          )) : <p>No hay productos disponibles</p>}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;

