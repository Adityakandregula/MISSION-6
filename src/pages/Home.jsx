import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero-card">
        <h1>Shop smarter with ShopZone</h1>
        <p>
          Discover curated products, view details instantly, and keep your cart alive
          while browsing without refreshing the page.
        </p>
        <Link to="/shop" className="button-primary">
          Explore the Collection
        </Link>
        <div className="hero-features">
          <div className="feature-pill">Fast client-side navigation</div>
          <div className="feature-pill">Persistent shopping cart</div>
          <div className="feature-pill">Secure guest checkout</div>
        </div>
      </div>
    </section>
  );
}
