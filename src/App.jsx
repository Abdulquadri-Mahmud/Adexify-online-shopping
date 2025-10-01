import { useEffect } from "react";
import PageRoutes from "./pages_routes/PageRoutes"
import { useCart } from "./pages/cartsPage/CartCountContext";
import { getCartToken } from './store/cart/utils/cartToken';

const App = ({ currentUser, guestCart, clearGuestCart, }) => {
  const { updateCart } = useCart();

  useEffect(() => {
    const syncCart = async () => {
      try {
        if (currentUser?._id) {
          // 1️⃣ Merge guest cart into user cart on backend
          const res = await fetch("https://adexify-api.vercel.app/api/cart/merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: currentUser._id,
              cartToken: getCartToken(), // guest cart token
            }),
          });

          const data = await res.json();
          if (data.success) {
            updateCart(data.cart); // ✅ update context globally
          }
        } else {
          // 2️⃣ Guest mode → fetch cart using token
          const token = getCartToken();

          if (!token) return;

          const res = await fetch(
            `https://adexify-api.vercel.app/api/cart/get?cartToken=${token}`
          );
          const data = await res.json();
          console.log("Guest Cart Data:", data);
          if (data.success) {
            updateCart(data.cart);
          }
        }
      } catch (error) {
        console.error("❌ Failed to sync cart:", error);
      }
    };

    syncCart();
  }, [currentUser]);

  return (
    <div>
      <PageRoutes/>
    </div>
  );
};

export default App;
