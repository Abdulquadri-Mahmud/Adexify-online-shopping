import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getCartToken, setCartToken } from "../../store/cart/utils/cartToken";

const ProductViews = ({ productId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordView = async () => {
      try {
        // Get existing cartToken from localStorage (for guest) or null
        let cartToken = getCartToken();

        const res = await axios.post(
          "https://adexify-api.vercel.app/api/product-views/views",
          {
            productId,
            cartToken,
          }
        );

        if (res.data?.views !== undefined) {
          setViews(res.data.views);
        }

        // Save new cartToken returned from backend if guest
        if (!currentUser && res.data?.cartToken) {
          setCartToken(res.data.cartToken);
        }
      } catch (err) {
        console.error("Failed to record product view:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      recordView();
    }
  }, [productId, currentUser]);

  if (loading) return <p>Loading views...</p>;

  return (
    <p className="text-gray-500 text-sm">
      {views} {views === 1 ? "view" : "views"}
    </p>
  );
};

export default ProductViews;
