import axios from "axios";
import React, { useState, useEffect } from "react";
import Profile from "./Profile.jsx";

const Friend = ({ friends, friendRequests }) => {

  
  const handleAcceptFriend = () => {
    axios.patch('/profile/acceptFriendRequest', { 'friendRequests': friendRequests })
  }

  return (
    <div>
      <h4>
        Friend Requests
      </h4>
      <div>
        {
          friendRequests.map(friend =>
            <div>
              <br/>
              {friend}
              <button onClick={() => handleAcceptFriend()}>
                Accept Friend Request
              </button>
            </div>
          )
        }
      </div>
      <h4>
        Friends List
      </h4>
      <div>
      {
        friends.length === 0 ? null :
          friends.map((friend) => {
            return <li>{friend}</li>
          })
      }
      </div>
    </div>
  )
};

export default Friend;