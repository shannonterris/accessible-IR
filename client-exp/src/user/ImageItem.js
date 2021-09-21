import React, { useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ImageItem({ tile }) {
  const { sendTouch } = useConversations();
  const imageClick = (e) => {
    console.log("clicked" + e.type); // debugging
    // Animate pulse for images to get feedback
    const imageElement = e.target;
    imageElement.classList.remove("touch-animation");
    void imageElement.offsetWidth;
    imageElement.classList.add("touch-animation");

    const currentDate = new Date(); // Get timestamp of when message is sent
    const timestamp = currentDate.getTime();
    sendTouch(tile.i, timestamp);

    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    const element = document.getElementById(tile.i);
    element.addEventListener("touchstart", imageClick); // for mobile compatibility
    element.addEventListener("click", imageClick); // for mouse compatibility
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
      }}
    >
      <Image src={tile.i} fluid draggable={false} />
    </div>
  );
}
