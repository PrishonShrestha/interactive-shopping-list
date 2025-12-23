import HeroSection from "../../features/Home/components/HeroSection/HeroSection";
import ProductList from "../../features/Home/components/ProductList/ProductList";
import "./HomePage.css";

const HomePage = () => {
  return (
    // <AddedNotificationCard />
    <div className="home-page-container">
      {/* <Navbar /> */}
      <HeroSection />

      <ProductList />
    </div>
  );
};

export default HomePage;
