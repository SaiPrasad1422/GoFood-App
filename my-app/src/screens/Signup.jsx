import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "", // ✅ Changed from geolocation to location
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate fields before submitting
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.location) {
      alert("All fields are required!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("Signup successful! Please log in.");
      navigate("/login"); // ✅ Redirect to login on success
    } else {
      alert("Enter valid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} required />
        </div>

        <div className="m-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required />
        </div>

        <div className="m-3">
          <label htmlFor="location" className="form-label">Address</label>
          <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} required />
        </div>

        <div className="m-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} required />
        </div>

        <button type="submit" className="m-3 btn btn-success">Sign Up</button>
        <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user? Login</Link>
      </form>
    </div>
  );
}
