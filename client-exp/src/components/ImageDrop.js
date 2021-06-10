import React, { useState } from "react";
import { Image } from "react-bootstrap";

export default function ImageDrop() {
  const [imageUrl, setImageUrl] = useState();

  function previewAndUploadImage(image) {
    // upload the image (send image to user)
    setImageUrl(image);

    // send new image message using server
    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();

    // sendImage(imgUrl, timestamp);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    const data = e.dataTransfer;

    const html = data.getData("text/html");
    const match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
    const url = match && match[1];

    if (url) {
      previewAndUploadImage(url);
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="drag-drop-zone w-100 h-100"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <Image src={imageUrl} draggable={false} fluid />
    </div>
  );
}
