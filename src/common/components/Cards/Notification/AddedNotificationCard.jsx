import "./AddedNotificationCard.css";
import { IoClose } from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";

import BasicButton from "../../Buttons/BasicButton";
import useAddToCart, {
  CartContext,
} from "../../../../features/ProductDetail/hooks/useAddToCart";

const AddedToCart = ({
  productImage,
  productName,
  brandName,
  productCategory,
  productSize,
  productPrice,
  closeModal,
  // openCart,
}) => {
  const { dispatch } = useAddToCart();

  const handleViewCart = () => {
    dispatch({ type: "TOGGLE_CART_MODAL", payload: true });
    document.body.style.overflow = "hidden";
    closeModal();
  };

  return (
    <div className="added-notification-card-container">
      <div className="notification-title">
        <TiInputChecked className="tick-icon" /> Added to a cart
      </div>
      <div className="close-notification-button" onClick={closeModal}>
        <IoClose />
      </div>
      <div className="notification-center-container">
        <div className="notification-left-container">
          <img src={productImage} alt="product image" />
        </div>
        <div className="notification-right-container">
          <h2>{productName}</h2>
          <p>{brandName}</p>
          <p>{productCategory}</p>
          <p>EU {productSize}</p>
          <span>${productPrice}</span>
        </div>
      </div>

      <BasicButton
        buttonTitle="View Cart"
        maxwidth="100%"
        onClick={() => handleViewCart()}
      />
    </div>
  );
};

export default AddedToCart;
