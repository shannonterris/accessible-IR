import React from "react";
import * as Constants from "../constants";
import HelperDashboard from "./HelperDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard({ id }) {
  return (
    <div className="container">
      <p className="h1">
        {id === Constants.userId ? "User Page" : "Helper Page"}
      </p>
      {id === Constants.helperId ? (
        <HelperDashboard id={id} />
      ) : (
        <UserDashboard id={id} />
      )}
    </div>
  );
}
