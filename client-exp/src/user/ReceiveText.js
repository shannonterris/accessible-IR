import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ReceiveText() {
  const { text } = useConversations();
  return (
    <div>
      <p className="p-3" style={{ "font-weight": "bold" }}>
        {text}
      </p>
    </div>
  );
}
