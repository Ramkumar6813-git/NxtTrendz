import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../context";
import { ThreeDots } from "react-loader-spinner";

import Cookies from "js-cookie";
import Header from "../Header/header";
import { FaStar } from "react-icons/fa";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

import "./style.css";

const apiConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE,",
};

function ProductDetails() {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [productDetails, setProductDetails] = useState({});
  const [cartItemQuantity, setCartItemQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addCartItem } = useContext(CartContext);
  const { id } = useParams();

  function updateSimilarProducts(similarProducts) {
    return similarProducts.map((product) => {
      const {
        availability,
        brand,
        description,
        id,
        image_url,
        price,
        rating,
        style,
        total_reviews,
        title,
      } = product;
      return {
        availability,
        brand,
        description,
        id,
        imageUrl: image_url,
        price,
        rating,
        style,
        totalReviews: total_reviews,
        title,
      };
    });
  }

  const fetchAndDisplayProductItemDetails = async () => {
    setApiStatus(apiConstants.loading);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const {
        availability,
        brand,
        title,
        style,
        description,
        id,
        image_url,
        total_reviews,
        price,
        rating,
      } = data;
      const updatedProductDetails = {
        availability,
        brand,
        title,
        style,
        description,
        id,
        imageUrl: image_url,
        totalReviews: total_reviews,
        price,
        rating,
      };
      const updatedSimilarProductsDetails = updateSimilarProducts(
        data.similar_products
      );
      setProductDetails(updatedProductDetails);
      setSimilarProducts(updatedSimilarProductsDetails);
      setApiStatus(apiConstants.success);
    } else {
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    fetchAndDisplayProductItemDetails();
  }, []);

  const renderLoadingView = () => (
    <div data-testid="loader" className="loader-div">
      <ThreeDots
        visible={true}
        color="#00BFFF"
        height={80}
        width={80}
        radius={9}
      />
    </div>
  );

  const renderProductDetails = () => {
    return (
      <>
        <div className="main-div py-4">
          <div className="image-div py-2">
            <img
              src={productDetails.imageUrl}
              alt="img-thumbnail"
              className="product-item-image "
            />
          </div>
          <div className="details-div p-md-4 p-lg-5">
            <h1 className="product-title py-2 fs-1 fw-bold">
              {productDetails.title}
            </h1>
            <h2 className="price my-2 fs-3">Rs {productDetails.price}/-</h2>
            <div className="sub-div mt-3 ">
              <p className="me-3 text-bg-primary px-3 py-1 rounded-2 fs-5">
                {productDetails.rating} <FaStar className="star-icon" />
              </p>
              <p className="reviews">{productDetails.totalReviews} Reviews</p>
            </div>
            <p className="description fs-5 py-2">
              {productDetails.description}
            </p>
            <p className="fs-5 my-2 text">
              <strong>Available: </strong>
              {productDetails.availability}
            </p>
            <p className="fs-5 my-1 text">
              <strong>Brand: </strong>
              {productDetails.brand}
            </p>
            <hr />
            <div className="quantity-count-container pb-2">
              <button type="button" onClick={onClickDecreaseQuantity}>
                <CiSquareMinus className="minus-icon" />
              </button>
              <p className="fs-5">{cartItemQuantity}</p>
              <button type="button" onClick={onClickIncreaseQuantity}>
                <CiSquarePlus className="plus-icon" />
              </button>
            </div>
            <button
              className="btn btn-primary px-3 py-2 my-2 addtocart-btn"
              onClick={onClickAddItemToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="similar-products-div py-2">
          <h1 className="my-2">Similar Products</h1>
          <ul className="products-list">
            {similarProducts.map((similarProduct) => {
              const {
                availability,
                brand,
                description,
                id,
                imageUrl,
                price,
                rating,
                style,
                total_reviews,
                title,
              } = similarProduct;
              return (
                <li key={id} className="similar-product-item ">
                  <Link to={`/products/${id}`} className="nav-link-component">
                    <div className="product-details py-1">
                      <img
                        src={imageUrl}
                        className="product-item-image rounded-3"
                        alt="product img"
                      />
                      <div className="details p-2">
                        <h4 className="product-title my-0 fs-4">{title}</h4>
                        <p className="product-brand fs-5">by {brand}</p>
                        <div className="sub-details py-2">
                          <h3 className="price">Rs {price}/-</h3>
                          <h5 className="rating text-bg-primary px-2 py-1 rounded">
                            {rating} <FaStar className="star-icon" />
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
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

  const renderProductDetailsView = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView();
      case apiConstants.success:
        return renderProductDetails();
      case apiConstants.failure:
        return renderFaiureView();
      default:
        return null;
    }
  };

  const onClickDecreaseQuantity = () => {
    if (cartItemQuantity > 1) {
      setCartItemQuantity(cartItemQuantity - 1);
    }
  };
  const onClickIncreaseQuantity = () => {
    setCartItemQuantity(cartItemQuantity + 1);
  };

  const onClickAddItemToCart = () => {
    const newProductItemDetails = {
      ...productDetails,
      quantity: cartItemQuantity,
    };
    addCartItem(newProductItemDetails);
  };

  return (
    <div className="container">
      <Header />
      <div className="product-details">{renderProductDetailsView()}</div>
    </div>
  );
}

export default ProductDetails;
