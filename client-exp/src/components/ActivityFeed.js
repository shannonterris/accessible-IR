import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function ActivityFeed() {
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { conversation } = useConversations();

  return (
    <div className="flex-grow-1 overflow-auto">
      <div className="d-flex flex-column align-items-start justify-content-end px-3">
        {conversation.map((message, index) => {
          const lastMessage = conversation.length - 1 === index;
          return (
            <div
              ref={lastMessage ? setRef : null}
              key={index}
              className={`my-1 d-flex flex-column ${
                message.fromMe
                  ? "align-self-end align-items-end"
                  : "align-items-start"
              }`}
            >
              <div
                className={`rounded px-2 py-1 ${
                  message.fromMe ? "bg-primary text-white" : "border"
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-muted small ${
                  message.fromMe ? "text-right" : ""
                }`}
              >
                {message.fromMe ? "You" : message.senderName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
