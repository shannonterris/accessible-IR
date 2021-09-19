import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ReceiveText() {
  const { text } = useConversations();
  return (
    <div>
      <p style={{ "font-weight": "bold" }}>{text}</p>
    </div>
  );
}
