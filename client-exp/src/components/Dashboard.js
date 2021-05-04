import React from "react";
import UserView from "./Message";

export default function Dashboard({ id }) {
  return (
    <div>
      <UserView id={id} />
    </div>
  );
}
