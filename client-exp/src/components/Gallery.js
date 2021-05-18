import React from "react";
import { Image } from "react-bootstrap";

export default function Gallery({ images }) {
  return (
    <div className="row">
      {images.map((i) => (
        <div className="col-lg-3 col-md-4 col-6">
          <a href="#" className="d-block mb-4 h-100">
            <Image key={i.image} src={i.image} alt="" thumbnail fluid />
          </a>
        </div>
      ))}
    </div>
  );
}
