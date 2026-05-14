import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Login() {
  const { isAuthenticated, loginAsGuest, logout } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogin = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <section className="login-page">
      <h2>Login</h2>
      {isAuthenticated ? (
        <div>
          <p>You are already logged in as guest.</p>
          <button className="button-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-card">
          <p>Click below to login as guest and continue to checkout.</p>
          <button className="button-primary" onClick={handleLogin}>
            Login as Guest
          </button>
        </div>
      )}
    </section>
  );
}
