import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
// code adapted from https://jsfiddle.net/SupunKavinda/vfxdwtpc/5/

export default function DropArea() {
  const [imgUrl, setImgUrl] = useState("");

  const { sendImage } = useConversations();

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  let dropRegion, imagePreviewRegion;

  // Wait until dom is loaded to get the regions
  window.onload = function () {
    // where files are dropped + file selector is opened
    dropRegion = document.getElementById("drop-region");
    // where images are previewed
    imagePreviewRegion = document.getElementById("image-preview");
    dropRegion.addEventListener("dragenter", preventDefault, false);
    dropRegion.addEventListener("dragleave", preventDefault, false);
    dropRegion.addEventListener("dragover", preventDefault, false);
    dropRegion.addEventListener("drop", handleDrop, false);
  };

  function handleDrop(e) {
    var dt = e.dataTransfer,
      files = dt.files;

    // check for img
    var html = dt.getData("text/html"),
      match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
      url = match && match[1];

    if (url) {
      previewAnduploadImage(url);
      return;
    }
  }

  function previewAnduploadImage(image) {
    // upload the image (send image to user)
    setImgUrl(image);

    // send new image message using server
    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();

    sendImage(imgUrl, timestamp);
  }

  return (
    <div id="drop-region" className="w-100 drop-region">
      <div id="image-preview">
        <Image src={imgUrl} fluid />
      </div>
    </div>
  );
}
