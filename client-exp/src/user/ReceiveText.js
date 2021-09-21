import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ReceiveText() {
  const { text } = useConversations();
  return (
    <div
      className="justify-content-center row "
      style={{ "background-color": "#D3B8F4", "border-radius": "10px" }}
    >
      <p>{text}</p>
    </div>
  );
}
