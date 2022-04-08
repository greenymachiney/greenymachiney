import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [picture, setPicture] = useState("");
  const [friends, setFriends] = useState([]);


  useEffect(() => {
    axios.get("/profile").then((profile) => {
      const user = profile.data;
      console.log(user);
      setProfileName(user.fullName);
      setPicture(user.picture);
      setFriends(user.friends)
    });
  });


  return (
    <div>
      <div className='bar-cart-header'>
        <h1>Profile</h1>
      </div>
      <div>
        {profileName}
        <img
          src={picture}
          alt="new"
        />
        <Friend friends={friends} />

      </div>
    </div>

      )
};

      export default Profile;