import React from "react";
import * as Constants from "../constants";
import HelperDashboard from "../helper/HelperDashboard";
import UserDashboard from "../user/UserDashboard";

export default function Dashboard({ id }) {
  return (
    <div
      className={`container ${
        id === Constants.userId ? "user-dashboard-container" : ""
      }`}
    >
      {id === Constants.helperId ? (
        <HelperDashboard id={id} />
      ) : (
        <UserDashboard id={id} />
      )}
    </div>
  );
}
