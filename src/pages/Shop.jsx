import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="shop-page">
      <h2>Shop Inventory</h2>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <div className="card-body">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
