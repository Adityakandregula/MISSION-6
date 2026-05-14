import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { totalItems, isAuthenticated } = useCart();

  return (
    <header className="navbar">
      <div className="brand">
        <Link to="/">ShopZone</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          Cart <span className="badge">{totalItems}</span>
        </Link>
        <Link to={isAuthenticated ? '/checkout' : '/login'}>{isAuthenticated ? 'Checkout' : 'Login'}</Link>
      </nav>
    </header>
  );
}
