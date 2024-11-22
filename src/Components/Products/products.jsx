import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header/header";
import { ThreeDots } from "react-loader-spinner";

import { BiSearch } from "react-icons/bi";
import { MdOutlineSort } from "react-icons/md";
import { FaStar } from "react-icons/fa";

import "./style.css";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const apiConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE,",
};

const filterOptionsList = {
  category: categoryOptions[0].categoryId,
  sortby: sortbyOptions[0].optionId,
  rating: ratingsList[0].ratingId,
};

function Products() {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOptions, setFilterOptions] = useState(filterOptionsList);

  const fetchAndDisplayProducts = async () => {
    setApiStatus(apiConstants.loading);
    const { category, sortby, rating } = filterOptions;
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/products?sort_by=${sortby}&category=${category}&title_search=${search}&rating=${rating}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      const updatedProducts = data.products.map((product) => {
        const { brand, id, image_url, price, rating, title } = product;
        return { brand, id, imageUrl: image_url, price, rating, title };
      });
      setProducts(updatedProducts);
      setApiStatus(apiConstants.success);
    } else {
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    fetchAndDisplayProducts();
  }, [filterOptions]);

  const clearFilters = () => {
    setFilterOptions({
      category: categoryOptions[0].categoryId,
      sortby: sortbyOptions[0].optionId,
      rating: ratingsList[0].ratingId,
    });
  };

  const renderLoadingView = () => (
    <div data-testid="loader" className="loader-div mt-5">
      <ThreeDots
        visible={true}
        color="#00BFFF"
        height={80}
        width={80}
        radius={9}
      />
    </div>
  );

  const renderProductsView = () => {
    if (products.length > 0) {
      return (
        <div className="products-section">
          <ul className="products-list">
            {products.map((productDetails) => {
              const { brand, id, imageUrl, price, rating, title } =
                productDetails;
              return (
                <li key={id} className="product-list-item ">
                  <Link to={`/products/${id}`} className="nav-link-component">
                    <div className="product-image-container ">
                      <img
                        src={imageUrl}
                        alt="product-img"
                        className="product-img rounded"
                      />
                    </div>
                    <div className="product-details-container p-md-2">
                      <div className="product-details">
                        <h1 className="product-title">{title}</h1>
                        <h1 className="product-brand my-0">by {brand}</h1>
                        <div className="sub-details my-1">
                          <h1 className="product-price">Rs {price}/-</h1>
                          <h1 className="product-rating text-bg-primary px-2 py-1 rounded">
                            {rating} <FaStar className="star-icon" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="no-products-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="not-priducts-img"
          />
          <h1 className="my-2">No Products Found</h1>
          <h6 className="mt-2">
            We could not find any products. Try other filters.
          </h6>
        </div>
      );
    }
  };

  const renderFaiureView = () => (
    <div className="failure-container d-flex flex-column justify-content-center align-items-center ">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-image my-4"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <button type="button" className="btn btn-primary continue-button">
        Continue Shopping
      </button>
    </div>
  );

  const renderProducts = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView();
      case apiConstants.success:
        return renderProductsView();
      case apiConstants.failure:
        return renderFaiureView();
      default:
        return null;
    }
  };

  return (
    <div className="container ">
      <Header />
      <div className="products-page">
        <div className="col-12 p-0">
          <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="register prime"
            className="register-prime-img"
          />
        </div>
        <div className="py-2 py-md-3 d-flex flex-column flex-md-row ">
          <div className="sub-div1 p-0 py-1">
            <div className="search-field search-field d-flex align-items-center text-align-center mb-3">
              <input
                type="search"
                className="input-field p-2 px-3"
                placeholder="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                value={search}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchAndDisplayProducts();
                  }
                }}
              />
              <button
                type="button"
                className="search-button-icon"
                onClick={fetchAndDisplayProducts}
              >
                <BiSearch className="icon" />
              </button>
            </div>
            <div className="col-12">
              <h1 className="head-text">Category</h1>
              <ul className="category-list">
                {categoryOptions.map((category) => {
                  const onClickChangeCategory = () => {
                    setFilterOptions({
                      ...filterOptions,
                      category: category.categoryId,
                    });
                  };
                  const categoryId = filterOptions.category
                  const isActive = category.categoryId === categoryId
                  return (
                    <li
                      key={category.categoryId}
                      className="category-list-item"
                    >
                      <button
                        type="button"
                        className={`category-button ${isActive && "active"}` }
                        onClick={onClickChangeCategory}
                      >
                        {category.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <h1 className="head-text">Rating</h1>
              <ul className="ratings-list">
                {ratingsList.map((rating) => {
                  const onClickChangeRating = () => {
                    setFilterOptions({
                      ...filterOptions,
                      rating: rating.ratingId,
                    });
                  };
                  return (
                    <li key={rating.ratingId} className="ratings-list-item">
                      <button
                        type="button"
                        className="ratings-button py-2"
                        onClick={onClickChangeRating}
                      >
                        <img
                          src={rating.imageUrl}
                          alt="rating-urls"
                          className="rating-image"
                        />
                        <span className="px-2"> & Up</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="sub-div2 p-0 py-3 py-md-0 w-100">
            <div className="title-sort-section ">
              <h1 className="head-text pt-md-2">All Products</h1>
              <div className="sort-by-filter-section py-3">
                <label htmlFor="sort-by" className="sort-by">
                  <MdOutlineSort className="bar-icon" /> Sort by
                </label>
                <select
                  id="sort-by"
                  className="option-select sort-by"
                  onChange={(e) => {
                    setFilterOptions({
                      ...filterOptions,
                      sortby: e.target.value,
                    });
                  }}
                >
                  {sortbyOptions.map((sortby) => {
                    return (
                      <option key={sortby.optionId} value={sortby.optionId}>
                        {sortby.displayText}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
