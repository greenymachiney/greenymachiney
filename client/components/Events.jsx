import React, { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";



const Events = () => {
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios.post('/event/addEvent', {
      event: {
        eventName: data.eventName,
        eventTime: data.eventTime,
        eventLocation: data.eventLocation,
        friends: []
      }
    })
    .then(() => getEvents())
    .then(() => getFriends())
    .catch(err => console.error(err));
  };

  const getEvents = () => {
    axios.get('/event')
      .then(({ data}) => {
        setEvents(data);
      })
      .catch(err => console.error(err));
  }

  const getFriends = () => {
    axios.get('/event/invites')
      .then(({ data }) => setFriends(data))
      .catch(err => console.error(err));
  }

  const inviteFriend = (friendName, eventName) => {
    axios.post('/event/addFriend', {
      data: {
        friend: friendName,
        event: eventName
      }
    })
    .then(({ data }) => {
      getEvents();
    })
    .catch(err => console.error(err));
  }


  useEffect(() => {
    getEvents();
    getFriends();
  }, []);

  return (
    <div className="events">
      <div className='events-header'>
      <h1>Plan a Party!</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="eventName">Event Name: </label>
          <input placeholder="Event Name" {...register("eventName")} />
        </div>

        <div>
          <label className="eventTime">Event Time: </label>
          <input placeholder="Event Time" {...register("eventTime")} />
        </div>

        <div>
          <label className="eventLocation">Event Location: </label>
          <input placeholder="Event Location" {...register("eventLocation")} />
        </div>
        <input type="submit" />
      </form>
        {
          events.map((event, i) => <div key={i} className="row">
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-title">Event </h5> 
                <div className="event-card-text">
                  <li>
                  {event.eventName} 
                    </li>
                    <li>
                    {event.eventTime}
                    </li>
                    <li>
                    {event.eventLocation}
                    </li>
                    <br />
                    <h5 className="card-title">Invited </h5> 
                    <ul>{event.friends.map((friend, i) => <li key={i}>{friend}</li>)}</ul>
                </div>
              </div> 
            </div>
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-title">Your Friends </h5> 
                <div className="card-body">
                    {
                      friends.map((friend, i) => 
                        <button key={i} onClick={() => inviteFriend(friend.username, event.eventName)}>
                          {friend.username} <br />
                        </button>) 
                    }
                    <br />
                </div>
              </div>
            </div>
            
        </div>)
      }
    </div>
  )

};

export default Events;
