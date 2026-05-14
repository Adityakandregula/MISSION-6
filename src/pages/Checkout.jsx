import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { cartItems, totalPrice } = useCart();

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <p>Review your cart and confirm your purchase.</p>
      <div className="checkout-summary">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.title}</span>
            <span>{item.quantity} × ${item.price}</span>
          </div>
        ))}
        <div className="checkout-total">
          <strong>Total</strong>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
      <p className="checkout-note">This is a mock checkout flow for the ShopZone SPA.</p>
    </section>
  );
}
