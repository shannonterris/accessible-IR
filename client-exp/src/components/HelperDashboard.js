import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import Message from "./Message";

export default function HelperDashboard({ id }) {
  return (
    <div className="row">
      <div className="col-6">
        <SearchSystem />
        <UserFeed />
      </div>
      <div class="col-6">
        <Message id={id} />
      </div>
    </div>
  );
}
