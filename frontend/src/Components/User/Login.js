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
            //userName:userName,
            email: email,
            password
            // type
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
                }
                else {
                    localStorage.setItem("staff", (res.data.UId))

                }
                setUserId(res.data.userId)
                setTest(!test)

                window.location.href = '/home';
                // , { replace: true }
            })
            .catch((err) => {
                alert("Email or Password is worng");
                console.log(err)
            });
    }









    return (<div>


        <div class="content">
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                    <div class="col-md-6">
                        <br></br>
                        <img src={Loginpic} alt="Image" class="img-fluid" />
                    </div>
                    <div class="col-md-6 contents">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="mb-4">
                                    <h3>Sign In</h3>

                                </div>
                                {/* <form action="#" method="post"> */}
                                <form onSubmit={sendData}>

                                    {/* login different users */}
                                    <div className="control has-text-white has-text-centered mb-4">
                                        <label className="radio" >
                                            <input type="radio" required value="stu" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                            Student
                                        </label>
                                        <label className="radio">
                                            <input type="radio" required value="stf" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                            Staff
                                        </label>
                                    </div>



                                    {/* <div class="form-group first">
                                        <label for="username">Username</label>
                                        <input type="text" class="form-control" id="username" />
                                    </div> */}

                                    <div class="form-group first">
                                        <label for="username">Username</label>
                                        <input type="email" class="form-control" id="email" onChange={(e) => { setemail(e.target.value) }} required />
                                    </div>



                                    <div class="form-group last mb-4">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" id="password" onChange={(e) => { setpassword(e.target.value) }} required />
                                    </div>

                                    <input type="submit" value="Log In" class="btn btn-block btn-primary" />

                                    {/* <div class="d-flex mb-5 align-items-center">
                                        <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                                            <input type="checkbox" checked="checked" />
                                            <div class="control__indicator"></div>
                                        </label>
                                        <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span>
                                    </div>

                                    <input type="submit" value="Log In" class="btn btn-block btn-primary" />

                                    <span class="d-block text-left my-4 text-muted">&mdash; or login with &mdash;</span>

                                    <div class="social-login">
                                        <a href="#" class="facebook">
                                            <span class="icon-facebook mr-3"></span>
                                        </a>
                                        <a href="#" class="twitter">
                                            <span class="icon-twitter mr-3"></span>
                                        </a>
                                        <a href="#" class="google">
                                            <span class="icon-google mr-3"></span>
                                        </a>
                                    </div>

                                    <div class="row">
                                        <span class="d-block text-left my-4 text-muted"> Don't Have an Account?  </span >
                                        <span class="ml-auto"><a href="#" class="create-one">Create One</a></span>
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