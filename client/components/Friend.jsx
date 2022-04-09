import React, { useState, useEffect } from "react";
import Profile from "./Profile.jsx";

const Friend = ({ friends }) => {

  return (
    <div>
      <h4>
        Friend Requests
      </h4>
      <h4>
        Friends List
      </h4>
      {
        friends.length === 0 ? null :
          friends.map((friend) => {
            <li>{friend}</li>
          })
      }
    </div>
  )
};

export default Friend;