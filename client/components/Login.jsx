import React, { useState } from "react";
import axios from "axios";

const getCookie = () => {
  axios.get('/' , (req, res) => {
    console.log(req.cookies);
  })
}

const Login = () => (
  <div>
    <div>
      <button>
        <a href='/auth/google'>Google Log In</a>
      </button>
    </div>
  </div>
)

export default Login;