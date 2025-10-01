// utils/cartToken.js
export const getCartToken = () => {
  let token = localStorage.getItem("cartToken");
  if (!token) {
    token = crypto.randomUUID(); // generate once for guest
    localStorage.setItem("cartToken", token);
  }
  return token;
};
