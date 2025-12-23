import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchedProducts from "./features/SearchedProducts/pages/SearchedProducts";
import Layout from "./common/layout/Layout";

import HomePage from "./pages/Home/HomePage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartPage from "./pages/Cart/CartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="cart" element={<CartPage />} /> */}
          <Route path="productDetail/:id" element={<ProductDetail />} />{" "}
          <Route path="searchedProducts" element={<SearchedProducts />} />{" "}
        </Route>
        {/* <Route path="cart" element={<CartPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
