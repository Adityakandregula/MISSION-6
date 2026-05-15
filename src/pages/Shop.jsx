import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const messageTimerRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        setError('Unable to load products.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.title} added to cart.`);

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    messageTimerRef.current = setTimeout(() => setMessage(''), 2500);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="shop-page">
      <h2>Shop Inventory</h2>
      {message && <p className="success-message">{message}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <Link className="product-link" to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <div className="card-body">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
            <div className="card-actions">
              <button
                className="button-primary"
                type="button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <Link className="button-secondary" to={`/product/${product.id}`}>
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
