import React from "react";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function UserFeed() {
  const { userActivity, conversation } = useConversations();
  return (
    <div className="border">
      User Activity
      {userActivity.map((image) => {
        return (
          <div>
            <Image src={image}></Image>
          </div>
        );
      })}
    </div>
  );
}
