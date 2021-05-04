import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversation, setConversation] = useLocalStorage("conversation", {});

  function createConversation(recipients) {
    setConversation({ messages: [] });
  }

  function addMessageToConversation({ text, sender, timestamp }) {
    setConversation((prevConversation) => {
      const newMessage = { sender, text, timestamp };
      const newConversation = prevConversation
        ? { messages: [...prevConversation.messages, newMessage] }
        : { messages: [newMessage] };
      return newConversation;
    });
  }

  function sendMessage(text, timestamp) {
    addMessageToConversation({ text, sender: id, timestamp });
  }

  const value = {
    conversation,
    createConversation,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
