import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        setError('Unable to load product.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-page">
      <div className="product-detail-card">
        <img src={product.thumbnail} alt={product.title} />
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p>{product.description}</p>
          <button className="button-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
