// import { useEffect, useState } from "react";

// const useAddToCart = () => {
//   const [cartItems, setCartItems] = useState(() => {
//     const localData = localStorage.getItem("data");
//     return localData ? JSON.parse(localData) : [];
//   });

//   // Check if product exists in cart
//   const checkIfProductExists = (productID, size) => {
//     return cartItems.some(
//       (item) => item.productID === productID && item.size === size
//     );
//   };

//   // Add product to cart
//   const addProductToCart = (product, size) => {
//     if (checkIfProductExists(product.productID, size)) return false;
//     setCartItems((prev) => [
//       ...prev,
//       {
//         ...product,
//         quantity: 1,
//         size: size,
//         productTotal: product.productPrice,
//       },
//     ]);
//     // localStorage.setItem("data", JSON.stringify(cartItems));

//     return true;
//   };

//   // Add to local storage
//   useEffect(() => {
//     localStorage.setItem("data", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return {
//     cartItems,
//     setCartItems,
//     addProductToCart,
//     checkIfProductExists,
//   };
// };
// export default useAddToCart;

//

// import { createContext, useContext, useEffect, useState } from "react";

// export const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);

//   const [cartItems, setCartItems] = useState(() => {
//     const localData = localStorage.getItem("data");
//     return localData ? JSON.parse(localData) : [];
//   });

//   const checkIfProductExists = (productID, size) => {
//     return cartItems.some(
//       (item) => item.productID === productID && item.size === size
//     );
//   };

//   const addProductToCart = (product, size) => {
//     if (checkIfProductExists(product.productID, size)) return false;

//     setCartItems((prev) => [
//       ...prev,
//       {
//         ...product,
//         quantity: 1,
//         size,
//         productTotal: product.productPrice,
//       },
//     ]);

//     return true;
//   };

//   useEffect(() => {
//     localStorage.setItem("data", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         setCartItems,
//         addProductToCart,
//         checkIfProductExists,
//         isCartModalOpen,
//         setIsCartModalOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useAddToCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useAddToCart must be used inside CartProvider");
//   }
//   return context;
// };
// export default useAddToCart;

//

import { createContext, useContext, useEffect, useReducer } from "react";

export const CartContext = createContext(null);

// Initial State
const initialState = {
  isCartModalOpen: false,
  cartItems: JSON.parse(localStorage.getItem("data")) || [],
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.cartItems.some(
        (item) =>
          item.productID === action.payload.product.productID &&
          item.size === action.payload.size
      );

      if (exists) return state;

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload.product,
            size: action.payload.size,
            quantity: 1,
            productTotal: action.payload.product.productPrice,
          },
        ],
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productID === action.payload.productID &&
          item.size === action.payload.size &&
          item.quantity < 10
            ? {
                ...item,
                quantity: item.quantity + 1,
                productTotal: item.productPrice * (item.quantity + 1),
              }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productID === action.payload.productID &&
          item.size === action.payload.size &&
          item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                productTotal: item.productPrice * (item.quantity - 1),
              }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item.productID !== action.payload.productID ||
            item.size !== action.payload.size
        ),
      };

    case "TOGGLE_CART_MODAL":
      return {
        ...state,
        isCartModalOpen: action.payload,
      };

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addProductToCart = (product, size) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, size } });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
const useAddToCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAddToCart must be used inside CartProvider");
  }
  return context;
};

export default useAddToCart;
