import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartToken } from "../store/cart/utils/cartToken"; // your existing function
import axios from "axios";

const ProductViews = ({ productId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordView = async () => {
      try {
        const cartToken = getCartToken(); // for guest users

        const res = await axios.post(
          "https://your-api-url.com/api/products/views", // replace with your API
          { productId, cartToken },
          {
            headers: {
              ...(currentUser && { Authorization: `Bearer ${currentUser.token}` }),
            },
          }
        );

        if (res.data?.views !== undefined) {
          setViews(res.data.views);
        }
      } catch (err) {
        console.error("Failed to record product view:", err);
      } finally {
        setLoading(false);
      }
    };

    recordView();
  }, [productId, currentUser]);

  if (loading) return <p>Loading views...</p>;

  return (
    <p className="text-gray-500 text-sm">
      {views} {views === 1 ? "view" : "views"}
    </p>
  );
};

export default ProductViews;
