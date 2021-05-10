import React, { useContext, useState, useEffect, useCallback } from "react";
import speak from "../components/SpeechSynthesis";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversation, setConversation] = useLocalStorage("conversation", {
    messages: [],
  });

  const socket = useSocket();

  function createConversation(recipients) {
    setConversation({ messages: [] }); // need to think about how to structure this
  }

  const addMessageToConversation = useCallback(
    ({ text, sender, timestamp }) => {
      setConversation((prevConversation) => {
        const newMessage = { sender, text, timestamp };
        const newConversation = prevConversation
          ? { messages: [...prevConversation.messages, newMessage] }
          : { messages: [newMessage] };
        return newConversation;
      }, speak(text, sender, id));
    },
    [setConversation]
  );

  const formattedConversation = conversation.messages.map((message) => {
    const fromMe = id === message.sender;
    return { ...message, fromMe };
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(text, timestamp) {
    socket.emit("send-message", { text, timestamp });
    addMessageToConversation({ text, sender: id, timestamp });
  }

  const value = {
    conversation: formattedConversation,
    createConversation,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
