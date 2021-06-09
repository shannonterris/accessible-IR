import React from "react";
import { Image } from "react-bootstrap";

export default function Gallery({ images, currentPage }) {
  // If current page is 1 0-9,   if 2  10-19   if 3 20-29
  const displayImages = images.slice((currentPage - 1) * 10, currentPage * 10);
  return (
    <div className="row">
      {displayImages.length === 0 ? (
        <div className="col-lg-5 ml-1">No Image Results</div>
      ) : null}
      {displayImages.map((i) => (
        <div className="col-lg-3 col-md-4 col-6">
          <a href="#" className="d-block mb-4 h-100">
            <Image key={i.image} src={i.image} alt="" thumbnail fluid />
          </a>
        </div>
      ))}
    </div>
  );
}
