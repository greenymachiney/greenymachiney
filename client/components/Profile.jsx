import React, { useState, useEffect } from "react";
import Friend from "./Friend.jsx";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [picture, setPicture] = useState("");
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("/profile/user").then((userdata) => {
      const user = userdata.data;
      // console.log(user);
      setProfileName(user.username);
      setPicture(user.thumbnail);
      setFriends(user.friends)
    });
    axios.get("/profile/users").then((response) => {
      setUsers(response.data)
    })
  }, []);

  const handleAddFriend = (friend) => {
    console.log(friend)
    axios.patch("/profile/sendFriendRequest", { username: friend, from: profileName}).then((friend) => {

    })
  }


  return (
    <div>
      <div className='bar-cart-header'>
        <h1>Profile</h1>
      </div>
      <img
        src={picture}
        alt="new"
      />
      <div>
        Hello {profileName}
      </div>
      <Friend friends={friends} />
      <h4>Other Users</h4>
      <div>
        {
          users.map(user =>
            <div>
              <br/>
              {user}
              <button onClick={() => handleAddFriend(user)}>
                Add as Friend
              </button>
            </div>
          )
        }
      </div>
    </div>

  )
};

export default Profile;