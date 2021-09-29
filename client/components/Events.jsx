import React, { useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";



const Events = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios.post()
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="eventName">Event Name: </label>
          <input placeholder="Event Name" {...register("Event Name")} />
        </div>

        <div>
          <label htmlFor="eventTime">Event Time: </label>
          <input placeholder="Event Time" {...register("eventTime")} />
        </div>

        <div>
          <label htmlFor="eventLocation">Event Location: </label>
          <input placeholder="Event Location" {...register("eventLocation")} />
        </div>

        <div>
          <label htmlFor="email">Send Out Invites: </label>
          <input
            placeholder="example@me.com"
            type="email"
            {...register("email")}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Events;
