import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const Home = () => {
  // State variables
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Function to fetch food data from API
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length >= 2) {
        setFoodItem(data[0] || []);
        setFoodCat(data[1] || []);
      } else {
        console.error("Invalid API response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          id="carousel"
          style={{ maxHeight: "400px", overflow: "hidden" }}
        >
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {["/burger_2.jpg", "/momos.jpg", "/paneer.jpg"].map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={src}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Food item"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Food Categories and Items Section */}
      <div className="container mt-4">
        {loading ? (
          <div className="text-center fs-4 text-secondary">
            Loading categories...
          </div>
        ) : foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="mb-5">
              <h3 className="text-center text-primary">{data.CategoryName}</h3>
              <hr />
              <div className="row g-3 align-items-stretch">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItem) => (
                      <Card
                        key={filterItem._id}
                        foodItem={filterItem}
                        options={filterItem.options[0]}
                      />
                    ))
                ) : (
                  <div className="text-center text-danger">
                    No food items available
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-danger">No categories found</div>
        )}
      </div>

      <Footer />
    </div>
  );
};
