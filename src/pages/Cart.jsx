import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty. Visit the shop to add items.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
              <button className="button-secondary" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total</h3>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </section>
  );
}
