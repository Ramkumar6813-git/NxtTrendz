import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addCartItem(object) {
    const { id, quantity } = object;
    const findIndex = cartItems.findIndex((item) => item.id === id);
    if (findIndex === -1) {
      setCartItems([...cartItems, object]);
    } else {
      const updatedArray = cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
      setCartItems(updatedArray);
    }
  }

  function removeCartItem(id) {
    const updatedArray = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedArray);
  }

  function emptyCartItems() {
    setCartItems([]);
  }

  function increaseCartItemQuantity(id) {
    const updateArray = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updateArray);
  }

  function decreaseCartItemQuantity(id) {
    const updateArray = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updateArray);
  }

  const value = useMemo(() => {
    return {
      cartItems,
      addCartItem,
      removeCartItem,
      emptyCartItems,
      increaseCartItemQuantity,
      decreaseCartItemQuantity,
    };
  }, [
    setCartItems,
    addCartItem,
    removeCartItem,
    emptyCartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
