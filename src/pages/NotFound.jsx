import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notfound-page">
      <h2>404</h2>
      <p>Page not found. Use the navigation to return to ShopZone.</p>
      <Link to="/" className="button-primary">
        Go Home
      </Link>
    </section>
  );
}
