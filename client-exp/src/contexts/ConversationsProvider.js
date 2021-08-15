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
  const [layout, setLayout] = useState([]);
  const [userActivity, setUserActivity] = useState([]);

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

  const addImagesToGrid = useCallback(
    ({ layout, sender, timestamp }) => {
      const currentLayout = JSON.parse(layout);
      console.log(currentLayout);
      currentLayout.forEach((item) => {
        item.static = true;
      });
      setLayout(currentLayout);
    },
    [setLayout]
  );

  const addUserActivity = useCallback(
    ({ image, sender, timestamp }) => {
      console.log("Recieved that user touched" + image);
      setUserActivity((prevUserActivity) => {
        const newUserActivity = [image, ...prevUserActivity];
        return newUserActivity;
      });
    },
    [setUserActivity]
  );

  const formattedConversation = conversation.messages.map((message) => {
    const fromMe = id === message.sender;
    return { ...message, fromMe };
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    socket.on("receive-image", addImagesToGrid);
    socket.on("receive-touch", addUserActivity);
    return () => {
      socket.off("receive-message");
      socket.off("receive-image");
      socket.off("receive-touch");
    };
  }, [socket, addMessageToConversation, addImagesToGrid, addUserActivity]);

  function sendMessage(text, timestamp) {
    socket.emit("send-message", { text, timestamp });
    addMessageToConversation({ text, sender: id, timestamp });
  }

  function sendImage(layout, timestamp) {
    socket.emit("send-image", { layout, timestamp });
  }

  function sendTouch(image, timestamp) {
    socket.emit("send-touch", { image, timestamp });
  }

  const value = {
    conversation: formattedConversation,
    createConversation,
    sendMessage,
    sendImage,
    sendTouch,
    userActivity,
    tiles: layout,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
