import React from "react";

const Login = () => (
  <header className="masthead">
    <div className="container position-relative">
        <div className="row justify-content-center">
            <div className="col-xl-6">
                <div className="text-center">
                    <h1 className="mb-5">Drink Dat</h1>
                    <div className="col-auto"><a href='/auth/google'><button className="btn btn-success btn-lg">Log In</button></a></div>
                </div>
            </div>
        </div>
    </div>
  </header>
)

export default Login;