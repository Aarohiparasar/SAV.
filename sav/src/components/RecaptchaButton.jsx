import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "../App.css";

const RecaptchaButton = () => {
  const [verified, setVerified] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Handle ReCAPTCHA Verification
  const handleRecaptchaChange = (value) => {
    if (value) {
      setVerified(true);
    }
  };

  // Fetch Items on "Load Items" Button Click
  const loadItems = () => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  };

  // Paginate items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Handle Pagination
  const goToNextPage = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="body">
      <h1>Sav.com</h1>
      {!verified && (
        <div className="ReCAPTCHA">
          <ReCAPTCHA
            sitekey="6LdkeJsqAAAAAPTYoBp7D1Y-aEY7LcH6ZH-kpAyM"
            onChange={handleRecaptchaChange}
          />
        </div>
      )}
      {verified && (
        <>
          <button className="btn" onClick={loadItems}>
            Load Items
          </button>
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <>
              <div className="items-grid">
                {paginatedItems.map((item) => (
                  <div key={item.id} className="item-card">
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>{item.category}</p>
                  </div>
                ))}
              </div>
              {items.length > itemsPerPage && (
                <div className="pagination">
                  <button
                    className="btn"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    className="btn"
                    onClick={goToNextPage}
                    disabled={
                      currentPage >= Math.ceil(items.length / itemsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RecaptchaButton;
