import React, { useEffect, useState } from 'react';
import Loginpic from './../../Assets/Images/pic1.svg';
import './../../Assets/Styles/Register.css';
import axios from 'axios';

function Login() {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [test, setTest] = useState(false)
    const [userId, setUserId] = useState('')
    const [type, settype] = useState('')

    function sendData(e) {
        e.preventDefault();
        let url
        if (type === "stu") {
            url = 'http://localhost:8070/user/login'

        }
        else {
            url = 'http://localhost:8070/api/supervisors/login'
        }
        const newUser = {
            email: email,
            password
        };

        axios
            .post(url, newUser)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res)

                }
                if (type === "stu") {
                    localStorage.setItem("user", (res.data.userId))
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("gid", res.data.gid)
                }
                else {
                    localStorage.setItem("staff", (res.data.UId))
                    localStorage.setItem("type", (res.data.type))
                    localStorage.setItem("staff-token", res.data.token)
                }
                setUserId(res.data.userId)
                setTest(!test)

                window.location.href = '/home';

            })
            .catch((err) => {
                alert("Email or Password is worng");
                console.log(err)
            });
    }

    return (<div>


        <div className="content">
            <div className="container rounded bg-white">
                <div className="row">
                    <div className="col-md-6">
                        <br></br>
                        <img src={Loginpic} alt="Image" className="img-fluid" />
                    </div>
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-6 pt-6">
                                <div className="mb-4">
                                    <h3>Sign In</h3>

                                </div>
                                {/* <form action="#" method="post"> */}
                                <form onSubmit={sendData}>

                                    {/* login different users */}
                                    <div className="control has-text-centered mb-4">
                                        <label className="radio" >
                                            <input type="radio" required value="stu" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                            Student
                                        </label>
                                        <label className="radio">
                                            <input type="radio" required value="stf" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                            Staff
                                        </label>
                                    </div>



                                    {/* <div className="form-group first">
                                        <label for="username">Username</label>
                                        <input type="text" className="form-control" id="username" />
                                    </div> */}

                                    <div className="form-group first">
                                        <label htmlFor="username">Username</label>
                                        <input type="email" className="form-control" id="email" onChange={(e) => { setemail(e.target.value) }} required />
                                    </div>



                                    <div className="form-group last mb-4">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" onChange={(e) => { setpassword(e.target.value) }} required />
                                    </div>

                                    <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                                    {/* <div className="d-flex mb-5 align-items-center">
                                        <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                            <input type="checkbox" checked="checked" />
                                            <div className="control__indicator"></div>
                                        </label>
                                        <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                    </div>

                                    <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                                    <span className="d-block text-left my-4 text-muted">&mdash; or login with &mdash;</span>

                                    <div className="social-login">
                                        <a href="#" className="facebook">
                                            <span className="icon-facebook mr-3"></span>
                                        </a>
                                        <a href="#" className="twitter">
                                            <span className="icon-twitter mr-3"></span>
                                        </a>
                                        <a href="#" className="google">
                                            <span className="icon-google mr-3"></span>
                                        </a>
                                    </div>

                                    <div className="row">
                                        <span className="d-block text-left my-4 text-muted"> Don't Have an Account?  </span >
                                        <span className="ml-auto"><a href="#" className="create-one">Create One</a></span>
                                    </div> */}

                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>




    </div>);
}

export default Login;