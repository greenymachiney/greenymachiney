import React, { useState, useEffect } from "react";

const Friend = (friends) => {
  
  

  


  return (
    <div>
      {friends.map((friend) => {
        <li>{friend}</li>
      })}
    </div>

  )
};

export default Friend;