import React, { useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ImageItem({ tile }) {
  // TODO: need to add animation on touch
  // potential reference? https://dev.to/samwatts98/how-to-easily-animate-your-react-components-on-click-with-css-keyframes-26mg
  const { sendTouch } = useConversations();
  const imageClick = (e) => {
    console.log("clicked" + e.type); // debugging
    // TODO
    // Animate pulse for images to get feedback
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
