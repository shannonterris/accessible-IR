import React from "react";
import UserView from "./UserView";

export default function Dashboard({ id }) {
  return (
    <div>
      <UserView id={id} />
    </div>
  );
}
