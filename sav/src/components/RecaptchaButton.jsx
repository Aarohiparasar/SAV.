import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "../App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RecaptchaButton = () => {
  const [verified, setVerified] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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
        setFilteredItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const searchResults = items.filter((item) =>
      item.category.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredItems(searchResults);
    setCurrentPage(1);
  };

  // Paginate items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle Pagination
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Drag-and-Drop
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list or in the same place, do nothing
    if (!destination || source.index === destination.index) {
      return;
    }

    // Rearrange items in the filtered array
    const reorderedItems = Array.from(filteredItems);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    // Update the state
    setFilteredItems(reorderedItems);
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by category"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="items-grid">
                  {(provided) => (
                    <div
                      className="items-grid"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {paginatedItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="item-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <img src={item.image} alt={item.title} />
                              <h2>{item.title}</h2>
                              <p>{item.category}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {filteredItems.length > itemsPerPage && (
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
                      currentPage >=
                      Math.ceil(filteredItems.length / itemsPerPage)
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
