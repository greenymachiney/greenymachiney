import React, { useState, useEffect } from "react";
import Profile from "./Profile.jsx";

const Friend = ({friends}) => {
  
  return (
    <div>
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