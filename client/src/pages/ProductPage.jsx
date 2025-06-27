import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../components/Cart";
import { AnimatePresence, motion } from "framer-motion";

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [productId]);

  if (product) {
    return (
      <section className="product-page">
        <ProductInfo product={product} />
        <Reviews productId={product._id} />
      </section>
    );
  } else {
    return (
      <div>
        <p>Loading product...</p>
      </div>
    );
  }
};

const ProductInfo = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  return (
    <section className="product-section">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>

        <div className="product-tags">
          <h3 className="">Tags: </h3>
          {product.tags.map((tag, i) => (
            <p className="product-tag" key={i}>
              {tag}
            </p>
          ))}
        </div>

        <div className="product-details-bottom">
          {product.tags.includes("sale") ? (
            <div className="product-price-container">
              <strike className="price">
                £{(product.priceInPence / 100).toFixed(2)}
              </strike>
              <p className="discounted-price">
                £{(product.salePriceInPence / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="product-price">
              £{(product.priceInPence / 100).toFixed(2)}
            </p>
          )}

          <button
            className="add-to-cart-button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const reviewsPerPage = 4;

  const fetchReviews = () => {
    axios
      .get(`http://localhost:5000/product/${productId}/reviews`)
      .then((res) => {
        setReviews(res.data);
        setCurrentPage(0); // reset to first page when refreshed
      })
      .catch((err) => console.error("Failed to load reviews:", err));
  };

  const addReview = ({ userName, comment, rating }) => {
    axios
      .post("http://localhost:5000/add-review", {
        productId,
        userName,
        comment,
        rating,
      })
      .then(fetchReviews)
      .catch((err) => console.error("Failed to add review:", err));

    setShowForm(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <section className="reviews-section">
      <div className="header">
        <span className="header-line" />
        <h2 className="text-center">Product Reviews</h2>
        <span className="header-line" />
      </div>
      <div className="product-reviews">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {paginatedReviews.map((review) => (
                <div key={review._id} className="review-card">
                  <span className="review-author">{review.userName}</span>
                  <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={`pagination-dot ${
                  i === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i)}
              />
            ))}
          </div>
        )}

        <div className="review-controls ">
          <div className="pagination-arrows">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              ←
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              →
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="add-review-button"
          >
            <h3>Add Review</h3> <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div
          className="review-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <AddReview onAdd={addReview} />
          </div>
        </div>
      )}
    </section>
  );
};

const AddReview = ({ onAdd }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const comment = form.comment.value;

    onAdd({ userName, comment, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        className="form-input"
      />

      <label htmlFor="comment">Review:</label>
      <input
        type="text"
        name="comment"
        id="comment"
        required
        className="form-input"
      />

      <label>Rating:</label>
      <StarRating onChange={setRating} />

      <button type="submit" className="add-review-button">
        <h3>Submit Review</h3> <span className="text-lg font-light">+</span>
      </button>
    </form>
  );
};

const StarRating = ({ onChange }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const stars = [0, 1, 2, 3, 4];

  const handleClick = (index) => {
    setSelected(index);
    onChange(index + 1); // rating is 1-based
  };

  return (
    <div
      className="star-rating"
      style={{ display: "flex", gap: "0.25rem", cursor: "pointer" }}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick(i)}
          style={{
            fontSize: "24px",
            color: (hovered !== null ? i <= hovered : i <= selected)
              ? "#ffc107"
              : "#ccc",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};
