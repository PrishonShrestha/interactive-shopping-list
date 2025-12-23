import HeroSection from "../../features/Home/components/HeroSection/HeroSection";
import ProductList from "../../features/Home/components/ProductList/ProductList";
import ShopByCategory from "../../features/Home/components/ShopByCategory/ShopByCategory";
import "./HomePage.css";

const HomePage = () => {
  return (
    // <AddedNotificationCard />
    <div className="home-page-container">
      {/* <Navbar /> */}
      <HeroSection />

      <ShopByCategory />

      <ProductList />
    </div>
  );
};

export default HomePage;
