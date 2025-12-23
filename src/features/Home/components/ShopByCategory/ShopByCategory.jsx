import "./ShopByCategory.css";
import categoryList from "../../../../data/categoryList";
import { useNavigate, useSearchParams } from "react-router-dom";
const ShopByCategory = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  // Handle click
  const handleClick = (categoryID) => {
    setSearchParam({ filter: categoryID });
    navigate(`/searchedProducts?filter=${categoryID}`, {
      replace: false,
    });
  };
  return (
    <div className="shop-by-category-container">
      <h2>Shop by Category</h2>
      <div className="category-card-container">
        {categoryList.map((category) => {
          return (
            <div
              onClick={() => handleClick(category.categoryID)}
              key={category.categoryID}
              className="category-card"
              style={{
                "--category-card-image": `url(${category.categoryImage})`,
              }}
            >
              <h3 className="category-name">{category.category}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByCategory;
