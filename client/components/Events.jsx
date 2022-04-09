import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  Route,
  Router,
  Routes,
  Outlet,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CreateBarCrawl from './CreateBarCrawl.jsx';
import CreateStaticEvent from './CreateStaticEvent.jsx';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);

  const { register, handleSubmit } = useForm();

  const { path, url } = useRouteMatch();

  const onSubmit = (data) => {
    axios
      .post('/event/addEvent', {
        event: {
          eventName: data.eventName,
          eventTime: data.eventTime,
          eventLocation: data.eventLocation,
          friends: [],
        },
      })
      .then(() => getEvents())
      .then(() => getFriends())
      .catch((err) => console.error(err));
  };

  const getEvents = () => {
    axios
      .get('/event')
      .then(({ data }) => {
        setEvents(data);
      })
      .catch((err) => console.error(err));
  };

  const getFriends = () => {
    axios
      .get('/event/invites')
      .then(({ data }) => setFriends(data))
      .catch((err) => console.error(err));
  };

  const inviteFriend = (friendName, eventName) => {
    axios
      .post('/event/addFriend', {
        data: {
          friend: friendName,
          event: eventName,
        },
      })
      .then(({ data }) => {
        getEvents();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getEvents();
    getFriends();
  }, []);

  return (
    <div className="events">
      {/* IMPORT FONT FOR CREATE AN EVENT BUTTON */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      />
      <div className="events-header">
        <h1>Plan a Party!</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="eventName">Event Name: </label>
          <input placeholder="Event Name" {...register('eventName')} />
        </div>

        <div>
          <label className="eventTime">Event Time: </label>
          <input placeholder="Event Time" {...register('eventTime')} />
        </div>

        <div>
          <label className="eventLocation">Event Location: </label>
          <input placeholder="Event Location" {...register('eventLocation')} />
        </div>
        <input type="submit" />
      </form>
      {events.map((event, i) => (
        <div key={i} className="row">
          <div className="col-sm-6">
            <div className="card">
              <h5 className="card-title">Event </h5>
              <div className="event-card-text">
                <li>{event.eventName}</li>
                <li>{event.eventTime}</li>
                <li>{event.eventLocation}</li>
                <br />
                <h5 className="card-title">Invited </h5>
                <ul>
                  {event.friends.map((friend, i) => (
                    <li key={i}>{friend}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <h5 className="card-title">Your Friends </h5>
              <div className="card-body">
                {friends.map((friend, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      inviteFriend(friend.username, event.eventName)
                    }
                  >
                    {friend.username} <br />
                  </button>
                ))}
                <br />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/*////////////////////////////////////////////////////////////////////// FAB HTML //////////////////////////////////////////////////////////////////////*/}
      <div className="fab-container">
        <div className="fab fab-icon-holder">
          <i className="fas fa-plus"></i>
        </div>

        <ul className="fab-options">
          <li>
            <span className="fab-label">New Bar Crawl</span>
            {/*//////////////////////////// Linking to "CreateBarCrawl bar crawl view" ///////////////////////*/}
            <Link
              to={`${url}/create-bar-crawl`}
              onClick={() => console.log(`LINE 155 || EVENTS.JS ||`, url, path)}
            >
              <div className="fab-icon-holder">
                {/* <a target="_blank" href="https://wa.me/XXXXXXXX"> */}
                <i className="far fa-comment-dots"></i>
                {/* </a> */}
              </div>
            </Link>
          </li>
          <li>
            <span className="fab-label">New Party</span>
            {/*///////////////////// Linking to "CreateStaticEvent static event view" /////////////////////////*/}
            <Link
              to={`${url}/create-static-event`}
              // onClick={() => console.log(`LINE 178 || EVENTS.JS ||`, url, path)}
            >
              <div className="fab-icon-holder">
                <i className="fas fa-globe"></i>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    </div>
  );
};

export default Events;
