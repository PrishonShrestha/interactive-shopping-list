// import "./CartModal.css";
// import { useNavigate } from "react-router-dom";

// import { FaPlus, FaMinus } from "react-icons/fa";
// import { GoTrash } from "react-icons/go";

// import useAddToCart from "../../../features/ProductDetail/hooks/useAddToCart";
// import useCart from "../../hooks/useCart";
// import BasicButton from "../../../common/components/Buttons/BasicButton";

// const CartPage = ({ isActive, setIsActive }) => {
//   const navigate = useNavigate();
//   const { cartItems, setCartItems, isCartModalOpen, setIsCartModalOpen } =
//     useAddToCart();

//   const { increaseQuantity, decreaseQuantity, removeItem, subTotal } = useCart(
//     cartItems,
//     setCartItems
//   );

//   // Handle Quantity increase
//   const handleQuantityIncrease = (product) => {
//     increaseQuantity(product);
//   };

//   // Handle Decrease quantity
//   const handleQuantityDecrease = (product) => {
//     decreaseQuantity(product);
//   };

//   // Delivery Charge
//   const deliveryCharge = cartItems.length === 0 ? 0 : 10;

//   // Handle modal closing
//   const handleModalClosing = () => {
//     setIsCartModalOpen(false), (document.body.style.overflow = "");
//   };

//   return (
//     <div className={`cart-modal-container ${isActive ? "active" : ""}`}>
//       {/* Close button */}
//       {/* <div className="close-button" onClick={() => navigate(-1)}> */}
//       <div className="close-button" onClick={() => handleModalClosing()}>
//         <svg
//           width="50"
//           height="50"
//           viewBox="0 0 24 24"
//           stroke="black"
//           strokeWidth="1"
//           fill="none"
//         >
//           <line x1="18" y1="6" x2="6" y2="18" />
//           <line x1="6" y1="6" x2="18" y2="18" />
//         </svg>
//       </div>

//       <div className="left-container">
//         <h2>Cart</h2>
//         {/* Cart Items */}

//         <div className="left-cart-list-container">
//           {cartItems.length !== 0 ? (
//             cartItems.length > 0 &&
//             cartItems.map((product) => {
//               return (
//                 <div className="cart-list">
//                   <div className="cart-list_left">
//                     <img src={product.imageUrl[0]} alt="Product Image" />
//                     <div className="button-container">
//                       <div className="increase-decrease-button-container">
//                         <button onClick={() => handleQuantityDecrease(product)}>
//                           <FaMinus />
//                         </button>
//                         <span>{product.quantity}</span>
//                         <button onClick={() => handleQuantityIncrease(product)}>
//                           <FaPlus />
//                         </button>
//                       </div>
//                       <button
//                         className="delete-button"
//                         onClick={() => removeItem(product)}
//                       >
//                         <GoTrash />
//                       </button>
//                     </div>
//                   </div>
//                   {/* Cart details */}
//                   <div className="cart-list-details">
//                     <div className="cart-list_mid">
//                       <h4>{product.productName}</h4>
//                       <p>{product.brandName}</p>
//                       <p>{product.productCategory}</p>
//                       <p>Size: {product.size}</p>
//                     </div>
//                     <div className="cart-list_right">
//                       <span>${product.productTotal}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div>Your Cart is empty</div>
//           )}
//         </div>
//       </div>
//       <div className="right-container">
//         <h2>Summary</h2>
//         <div className="summary-list">
//           <div>Subtotal</div>
//           <span>${subTotal}</span>
//         </div>
//         <div className="summary-list">
//           <div>Shipping Charge</div>
//           <span>${deliveryCharge}</span>
//         </div>
//         <hr />
//         <div className="summary-list total">
//           <div>Total</div>
//           <span>${subTotal + deliveryCharge}</span>
//         </div>
//         <hr />

//         <BasicButton buttonTitle="Check Out" maxwidth="100%" />
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//

import "./CartModal.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

import useAddToCart from "../../../features/ProductDetail/hooks/useAddToCart";
import useCart from "../../hooks/useCart";
import BasicButton from "../../../common/components/Buttons/BasicButton";

const CartPage = ({ isActive }) => {
  const { state, dispatch } = useAddToCart();
  const { cartItems, isCartModalOpen } = state;

  const { increaseQuantity, decreaseQuantity, removeItem, subTotal } = useCart(
    cartItems,
    dispatch
  );

  const deliveryCharge = cartItems.length === 0 ? 0 : 10;

  const handleModalClosing = () => {
    dispatch({ type: "TOGGLE_CART_MODAL", payload: false });
    document.body.style.overflow = "";
  };

  return (
    <div className={`cart-modal-container ${isActive ? "active" : ""}`}>
      <div className="close-button" onClick={handleModalClosing}>
        ✕
      </div>

      <div className="left-container">
        <h2>Cart</h2>

        <div className="left-cart-list-container">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div
                className="cart-list"
                key={`${product.productID}-${product.size}`}
              >
                <div className="cart-list_left">
                  <img src={product.imageUrl[0]} alt="Product" />

                  <div className="button-container">
                    <div className="increase-decrease-button-container">
                      <button onClick={() => decreaseQuantity(product)}>
                        <FaMinus />
                      </button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product)}>
                        <FaPlus />
                      </button>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() => removeItem(product)}
                    >
                      <GoTrash />
                    </button>
                  </div>
                </div>

                <div className="cart-list-details">
                  <div className="cart-list_mid">
                    <h4>{product.productName}</h4>
                    <p>{product.brandName}</p>
                    <p>{product.productCategory}</p>
                    <p>Size: {product.size}</p>
                  </div>

                  <div className="cart-list_right">
                    <span>${product.productTotal}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Your Cart is empty</div>
          )}
        </div>
      </div>

      <div className="right-container">
        <h2>Summary</h2>

        <div className="summary-list">
          <div>Subtotal</div>
          <span>${subTotal}</span>
        </div>

        <div className="summary-list">
          <div>Shipping Charge</div>
          <span>${deliveryCharge}</span>
        </div>

        <hr />

        <div className="summary-list total">
          <div>Total</div>
          <span>${subTotal + deliveryCharge}</span>
        </div>

        <hr />

        <BasicButton buttonTitle="Check Out" maxwidth="100%" />
      </div>
    </div>
  );
};

export default CartPage;
