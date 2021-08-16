import React from "react";
import Message from "./Message";

export default function UserDashboard({ id }) {
  return (
    <div>
      <Message id={id} />
    </div>
  );
}
