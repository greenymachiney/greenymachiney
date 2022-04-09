import React, { useState, useEffect } from "react";
import Friend from "./Friend.jsx";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [picture, setPicture] = useState("");
  const [friends, setFriends] = useState([]);


  useEffect(() => {
    axios.get("/profile/user").then((userdata) => {
      const user = userdata.data;
      // console.log(user);
      setProfileName(user.username);
      setPicture(user.thumbnail);
      setFriends(user.friends)
    });
  }, []);


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
        {profileName}
      </div>
      <Friend friends={friends} />
    </div>

  )
};

export default Profile;