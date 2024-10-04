import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS

// Sticky Header Component
const StickyHeader = () => (
  <div className="sticky-header">
    <h2>Product List</h2>
  </div>
);

// Loader Component
const FooterLoader = ({ isLoading }) => {
  return isLoading ? <div className="footer-loader">Loading more products...</div> : null;
};

// Footer Component
const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  );
};

// Main ProductList Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from JSONPlaceholder
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <StickyHeader />
      
      {/* Message when no products are found */}
      {products.length === 0 && !isLoading ? <p>No products found.</p> : null}

      {/* Product List */}
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.body}</p>
          </li>
        ))}
      </ul>

      {/* Loader */}
      <FooterLoader isLoading={isLoading} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductList;
