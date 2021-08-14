import React, { useEffect } from "react";
import { Image, Button } from "react-bootstrap";

export default function ImageItem({ tile }) {
  const imageClick = (e) => {
    console.log("clicked");
    e.stopPropagation();
  };

  useEffect(() => {
    const element = document.getElementById(tile.i);
    element.addEventListener("touchstart", imageClick);
  }, []);

  return (
    <div>
      <Image src={tile.i} fluid draggable={false} />
    </div>
  );
}
