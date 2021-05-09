import React from "react";
import Message from "./Message";

export default function UserDashboard({ id }) {
  return (
    <div class="w-100">
      <Message id={id} />
    </div>
  );
}
