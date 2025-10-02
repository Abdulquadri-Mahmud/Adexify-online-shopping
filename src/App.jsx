import { useEffect, useRef  } from "react";
import PageRoutes from "./pages_routes/PageRoutes";
import { useCart } from "./pages/cartsPage/CartCountContext";
import { getCartToken } from './store/cart/utils/cartToken';
import { useSelector } from "react-redux";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  const { updateCart } = useCart();
  const hasMergedRef = useRef(false); // ✅ prevents repeated merge

  useEffect(() => {
    const syncCart = async () => {
      const token = getCartToken();

      if (currentUser?._id && !hasMergedRef.current) {
        // ✅ Merge guest cart into user cart only once
        hasMergedRef.current = true;

        try {
          if (token) {
            const res = await fetch("https://adexify-api.vercel.app/api/cart/merge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: currentUser._id,
                cartToken: token,
              }),
            });
            const data = await res.json();
            if (data.success && data.cart) updateCart(data.cart);
          } else {
            // Fetch user cart if no guest cart
            const res = await fetch(
              `https://adexify-api.vercel.app/api/cart/get-user-cart/${currentUser._id}`
            );
            const data = await res.json();
            if (data.success && data.cart) updateCart(data.cart);
          }
        } catch (error) {
          console.error("❌ Failed to merge cart:", error);
        }
      } else if (!currentUser?._id && token) {
        // Guest mode → fetch cart once
        try {
          const res = await fetch(
            `https://adexify-api.vercel.app/api/cart/get?cartToken=${token}`
          );
          const data = await res.json();
          if (data.success && data.cart) updateCart(data.cart);
        } catch (error) {
          console.error("❌ Failed to fetch guest cart:", error);
        }
      }
    };

    syncCart();
  }, [currentUser, updateCart]);

  return (
    <div>
      <PageRoutes />
    </div>
  );
};

export default App;
