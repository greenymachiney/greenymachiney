import React, { useState, useEffect } from "react";
import Friend from "./Friend.jsx";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [picture, setPicture] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("/profile/user").then((userdata) => {
      const user = userdata.data;
      // console.log(user);
      setProfileName(user.username);
      setPicture(user.thumbnail);
      setFriends(user.friends)
      setFriendRequests(user.friendRequests)
    });
    axios.get("/profile/users").then((response) => {
      setUsers(response.data)
    })
  }, [friends]);

  const handleAddFriend = (friend) => {
    console.log(friend)
    axios.patch("/profile/sendFriendRequest", { username: friend, from: profileName})
      .catch(err => console.error(err))
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
      <Friend friends={friends} friendRequests={friendRequests} />
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