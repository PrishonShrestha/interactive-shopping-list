// import BasicButton from "../../common/components/Buttons/BasicButton";
// import "./ProductDetail.css";
// import productList from "../../data/productList";
// import brandList from "../../data/brandList";
// import ProductCard from "../../common/components/Cards/ProductCard/ProductCard";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import useAddToCart from "../../features/ProductDetail/hooks/useAddToCart";
// import AddedNotificationCard from "../../common/components/Cards/Notification/AddedNotificationCard";

// const ProductDetail = () => {
//   // const location = useLocation();
//   // const { product } = location.state;

//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [currentBrand, setCurrentBrand] = useState(null);

//   // if (!product) return <div>Product not found</div>;

//   const [similarProducts, setSimilarProducts] = useState([]);

//   const [largeImage, setLargeImage] = useState();
//   const [selectedSize, setSelectedSize] = useState(0);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const { addProductToCart, checkIfProductExists } = useAddToCart();

//   // const alreadyInCart = checkIfProductExists(currentProduct.productID);
//   // console.log("ALreact in cart " + alreadyInCart);

//   // Handle add to cart
//   const handleAddToCart = (product, size) => {
//     selectedSize
//       ? addProductToCart(product, size)
//       : alert("Please Select size");

//     checkIfProductExists(currentProduct.productID, selectedSize)
//       ? null
//       : makeModalVisible();
//   };

//   //Modal visible
//   const makeModalVisible = () => {
//     setIsModalVisible(true);
//     setTimeout(() => {
//       setIsModalVisible(false);
//     }, 3000);
//   };

//   // Update product
//   useEffect(() => {
//     const product = productList.find((p) => p.productID.toString() === id);
//     setCurrentProduct(product);

//     const brand = brandList.find(
//       (b) => b.brandName.toLowerCase() === product.brandName.toLowerCase()
//     );

//     setCurrentBrand(brand);

//     if (product) setLargeImage(product.imageUrl[0]);
//   }, [id]);

//   // similar product
//   useEffect(() => {
//     if (!currentProduct) return;

//     const similar = productList.filter(
//       (item) =>
//         item.productID !== currentProduct.productID &&
//         item.productCategory === currentProduct.productCategory
//       // (item.productCategory === product.productCategory ||
//       //   item.brandName == product.brandName)
//     );

//     // Function to shuffle array
//     function shuffle(array) {
//       let currentIndex = array.length;

//       while (currentIndex != 0) {
//         // Pick a remaining element...
//         let randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         // And swap it with the current element.
//         [array[currentIndex], array[randomIndex]] = [
//           array[randomIndex],
//           array[currentIndex],
//         ];
//       }
//       return array;
//     }

//     // Shuffle  filtered similar products
//     const shuffled = shuffle(similar);

//     setSimilarProducts(shuffled.slice(0, 10));

//     setSelectedSize("");
//   }, [currentProduct]);

//   return !currentProduct ? (
//     <div>Loading...</div>
//   ) : (
//     <div className="product-detail_container">
//       <div className="detail-center_container">
//         <div className="detail-left_container">
//           {/* Large Image */}
//           <div className="large-image_container">
//             <img
//               src={largeImage}
//               // src="https://imgs.search.brave.com/InMT1VmKml7fDvmWWoHjCkpPbTEIebdzKMqBaDlksvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8xOC8wNS81My9z/bmVha2Vycy04MDAx/Mzk0XzY0MC5qcGc"
//               alt=""
//             />
//           </div>
//           {/* Image options */}
//           <div className="small-image_container">
//             {currentProduct.imageUrl.map((image) => (
//               <img
//                 src={image}
//                 alt="Product Image"
//                 onClick={() => setLargeImage(image)}
//                 className={largeImage === image ? "selected-image" : ""}
//               />
//             ))}
//           </div>
//         </div>
//         {/* Right Container */}
//         <div className="detail-right_container">
//           <div className="brand_container">
//             <img src={currentBrand.brandLogo} alt="" />
//             <div>{currentBrand.brandName}</div>
//           </div>
//           <h2>{currentProduct.productName}</h2>
//           <p>{currentProduct.productCategory}</p>
//           <span>${currentProduct.productPrice}</span>
//           <h4>Color</h4>
//           <div className="color-options_container">
//             <img
//               src="https://imgs.search.brave.com/InMT1VmKml7fDvmWWoHjCkpPbTEIebdzKMqBaDlksvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8xOC8wNS81My9z/bmVha2Vycy04MDAx/Mzk0XzY0MC5qcGc"
//               alt=""
//             />
//             <img
//               src="https://imgs.search.brave.com/InMT1VmKml7fDvmWWoHjCkpPbTEIebdzKMqBaDlksvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8xOC8wNS81My9z/bmVha2Vycy04MDAx/Mzk0XzY0MC5qcGc"
//               alt=""
//             />
//             <img
//               src="https://imgs.search.brave.com/InMT1VmKml7fDvmWWoHjCkpPbTEIebdzKMqBaDlksvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8xOC8wNS81My9z/bmVha2Vycy04MDAx/Mzk0XzY0MC5qcGc"
//               alt=""
//             />
//           </div>

//           <h4>Sizes</h4>
//           <div className="sizes_container">
//             {currentProduct.sizes.map((size, index) => (
//               <div
//                 key={index}
//                 className={selectedSize === size ? "selected-size" : "size"}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size}
//               </div>
//             ))}
//           </div>

//           <BasicButton
//             onClick={() => handleAddToCart(currentProduct, selectedSize)}
//             buttonTitle={
//               checkIfProductExists(currentProduct.productID, selectedSize)
//                 ? `Already in cart`
//                 : `Add to cart`
//             }
//           />
//         </div>
//       </div>

//       {/* Similar products */}

//       <div className="similar-products-container">
//         <h2>Similar Products</h2>

//         <div className="similar-products">
//           {similarProducts.map((product, index) => {
//             return (
//               <div
//                 onClick={() =>
//                   navigate(`/productDetail/${product.productID}`, {
//                     replace: true,
//                   })
//                 }
//               >
//                 <ProductCard
//                   key={index}
//                   productName={product.productName}
//                   productImage={product.imageUrl[0]}
//                   productPrice={product.productPrice}
//                   brandName={product.brandName}
//                   width="200px"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Notification */}
//       <div
//         className={`notification-container ${isModalVisible ? "visible" : ""}`}
//       >
//         {isModalVisible && (
//           <AddedNotificationCard
//             productName={currentProduct.productName}
//             brandName={currentProduct.brandName}
//             productImage={currentProduct.imageUrl[0]}
//             productCategory={currentProduct.productCategory}
//             productPrice={currentProduct.productPrice}
//             productSize={selectedSize}
//             closeModal={() => setIsModalVisible(false)}
//             // cartOpen={() => handleOpenCart()}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import BasicButton from "../../common/components/Buttons/BasicButton";
import "./ProductDetail.css";
import productList from "../../data/productList";
import brandList from "../../data/brandList";
import ProductCard from "../../common/components/Cards/ProductCard/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAddToCart from "../../features/ProductDetail/hooks/useAddToCart";
import AddedNotificationCard from "../../common/components/Cards/Notification/AddedNotificationCard";
import ZoomableImage from "../../common/components/ZoomableImage/ZoomableImage";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { state, dispatch } = useAddToCart();
  const { cartItems } = state;

  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const [largeImage, setLargeImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Check if product exists
  const productExistsInCart = (productID, size) =>
    cartItems.some(
      (item) => item.productID === productID && item.size === size
    );

  // Add to Cart
  const handleAddToCart = (product, size) => {
    if (!size) {
      alert("Please select size");
      return;
    }

    if (productExistsInCart(product.productID, size)) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: { product, size },
    });

    makeModalVisible();
  };

  const makeModalVisible = () => {
    setIsModalVisible(true);
    setTimeout(() => setIsModalVisible(false), 3000);
  };

  // Load Product
  useEffect(() => {
    const product = productList.find((p) => p.productID.toString() === id);

    if (!product) return;

    setCurrentProduct(product);
    setLargeImage(product.imageUrl[0]);

    const brand = brandList.find(
      (b) => b.brandName.toLowerCase() === product.brandName.toLowerCase()
    );

    setCurrentBrand(brand);
  }, [id]);

  // Similar Products
  useEffect(() => {
    if (!currentProduct) return;

    const similar = productList.filter(
      (item) =>
        item.productID !== currentProduct.productID &&
        item.productCategory === currentProduct.productCategory
    );

    // Function to shuffle array
    function shuffle(array) {
      let currentIndex = array.length;

      while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }

    // Shuffle  filtered similar products
    const shuffled = shuffle(similar);

    setSimilarProducts(shuffled.slice(0, 10));

    setSelectedSize("");
  }, [currentProduct]);

  // Render
  if (!currentProduct) return <div>Loading...</div>;

  return (
    <div className="product-detail_container">
      <div className="detail-center_container">
        {/* LEFT */}
        <div className="detail-left_container">
          {/* Main image */}
          <div className="large-image_container">
            <ZoomableImage
              src={largeImage}
              zoom={3} // how much to zoom on hover
            />
          </div>

          {/* Smaller Images */}
          <div className="small-image_container">
            {currentProduct.imageUrl.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product"
                onClick={() => setLargeImage(image)}
                className={largeImage === image ? "selected-image" : ""}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="detail-right_container">
          <div className="brand_container">
            <img src={currentBrand?.brandLogo} alt="Brand" />
            <div>{currentBrand?.brandName}</div>
          </div>

          <h2>{currentProduct.productName}</h2>
          <p>{currentProduct.productCategory}</p>
          <span>${currentProduct.productPrice}</span>

          <h4>Color</h4>
          <div className="color-options_container">
            {currentProduct.imageUrl.slice(0, 3).map((img, i) => (
              <img key={i} src={img} alt="Color option" />
            ))}
          </div>

          <h4>Sizes</h4>
          <div className="sizes_container">
            {currentProduct.sizes.map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "selected-size" : "size"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <BasicButton
            onClick={() => handleAddToCart(currentProduct, selectedSize)}
            buttonTitle={
              productExistsInCart(currentProduct.productID, selectedSize)
                ? "Already in cart"
                : "Add to cart"
            }
          />
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="similar-products-container">
        <h2>Similar Products</h2>

        <div className="similar-products">
          {similarProducts.map((product) => (
            <div
              key={product.productID}
              onClick={() =>
                navigate(`/productDetail/${product.productID}`, {
                  replace: true,
                })
              }
            >
              <ProductCard
                productName={product.productName}
                productImage={product.imageUrl[0]}
                productPrice={product.productPrice}
                brandName={product.brandName}
                width="200px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATION */}
      <div
        className={`notification-container ${isModalVisible ? "visible" : ""}`}
      >
        {isModalVisible && (
          <AddedNotificationCard
            productName={currentProduct.productName}
            brandName={currentProduct.brandName}
            productImage={currentProduct.imageUrl[0]}
            productCategory={currentProduct.productCategory}
            productPrice={currentProduct.productPrice}
            productSize={selectedSize}
            closeModal={() => setIsModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
