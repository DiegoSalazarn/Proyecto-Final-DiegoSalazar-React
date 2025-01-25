import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("El producto no existe");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;

  return product ? (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="img-fluid" />
      <p>{product.description}</p>
      <h4>Precio: ${product.price}</h4>
    </div>
  ) : (
    <p>Producto no encontrado</p>
  );
};

export default ItemDetailContainer;
