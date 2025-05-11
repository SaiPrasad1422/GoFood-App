import React from 'react'

export default function Carousal() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain ! important"}}>
        <div className="carousel-inner" id="carousel" style={{ maxHeight: "400px", overflow: "hidden" }}>
          
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

          <div className="carousel-item active">
            <img src="/burger_2.jpg" className="d-block  w-100" style={{ filter: "brightness(30%)" }} />
          </div>

          <div className="carousel-item">
            <img src="/momos.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
          </div>

          <div className="carousel-item">
            <img src="/paneer.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
          </div>

        </div>
      </div>
    </div>
  )
}
