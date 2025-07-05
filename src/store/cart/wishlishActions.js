// wishlistActions.js
export const SET_WISHLIST_COUNT = 'SET_WISHLIST_COUNT';

export const setWishlistCount = (wishlistCount) => ({
  type: SET_WISHLIST_COUNT,
  payload: wishlistCount,
});
