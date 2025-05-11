import React, { useEffect, useState, useRef } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  const { options, foodItem } = props;
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const [finalPrice, setFinalPrice] = useState(qty * Number(options[size]));

  useEffect(() => {
    setSize(priceRef.current?.value || priceOptions[0]);
  }, [priceOptions]);

  useEffect(() => {
    setFinalPrice(qty * Number(options[size]));
  }, [qty, size, options]);

  const handleAddToCart = async () => {
    const pricePerItem = Number(options[size]);
    const quantity = Number(qty);
  
    if (isNaN(pricePerItem) || isNaN(quantity)) {
      console.error("Invalid price or quantity:", pricePerItem, quantity);
      return;
    }
  
    let existingFood = data.find(item => item.id === foodItem._id && item.size === size);
  
    if (existingFood) {
      // Update quantity and price for existing item (same food, same size)
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        size,
        qty: existingFood.qty + quantity,  // Increase quantity
        price: pricePerItem * (existingFood.qty + quantity), // Update price
      });
    } else {
      // Add new item (either a different size or a completely new item)
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        qty: quantity,
        size,
        price: pricePerItem * quantity,
        img: foodItem.img,
      });
    }
  };
  
  return (
    <div className="col-md-4 col-lg-3 col-sm-6 d-flex justify-content-center">
      <div className="card mt-2 shadow-lg" style={{ width: "18rem", maxHeight: "400px", borderRadius: "10px" }}>
        <img
          src={foodItem?.img}
          className="card-img-top"
          alt={foodItem?.name}
          style={{ height: "160px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        />
        <div className="card-body p-3 text-center d-flex flex-column justify-content-between" style={{ height: "240px" }}>
          <div>
            <h5 className="card-title">{foodItem?.name}</h5>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>{foodItem?.description}</p>
          </div>
          
          <div className="container w-100 d-flex justify-content-between align-items-center">
            <select
              className="form-select form-select-sm w-50 bg-success text-white border-0 rounded"
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="form-select form-select-sm w-50 bg-success text-white border-0 rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option} - ₹{options[option]}
                </option>
              ))}
            </select>
          </div>

          <div className="fs-5 mt-2 fw-bold">₹{finalPrice}/-</div>

          <button className="btn btn-success w-100 mt-2 fw-bold" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
