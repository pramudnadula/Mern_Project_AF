

import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Registerpic from './../../Assets/Images/illustration.svg';
import './../../Assets/Styles/Register.css';
import PasswordChecklist from "react-password-checklist"

function Register() {


    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [type, settype] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confpassword, setconfpassword] = useState("")
    const [users, setUsers] = useState([])
    useEffect(() => {

    }, [])




    function sendData(e) {
        e.preventDefault();

        if (confpassword === password) {

        }
        else {
            return (alert("Password Doesn't match"))
        }
        const newUser = {
            fname,
            lname,
            email,
            type,
            username,
            password
        };

        axios
            .post('http://localhost:8070/user/signup', newUser)
            .then(() => {
                alert('User Create Successfully ');
                setemail('');
                setfname('');
                setlname('');
                settype('');
                setusername('');
                setpassword('');
                setconfpassword('');
                window.location.href = '/login';
            })
            .catch((err) => {
                alert("Email Already Exists");
                console.log(err)
            });
    }









    return (<div>

        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row ">
                <div class="col-md-6">
                    <br></br>
                    <br></br>
                    <br></br>
                    <img src={Registerpic} alt="Image" class="img-fluid" />
                </div>
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    {/* <div class="card py-3 px-2"> */}
                    <h3>Create an Account</h3>
                    {/* <p class="text-center mb-3 mt-2">Get started with your free account</p> */}

                    {/* <div class="row mx-auto ">
                            <div class="col-4"> <i class="fab fa-twitter"></i> </div>
                            <div class="col-4"> <i class="fab fa-facebook"></i> </div>
                            <div class="col-4"> <i class="fab fa-google"></i> </div>
                        </div> */}

                    {/* <div class="division">
                            <div class="row">
                                <div class="col-3">
                                    <div class="line l"></div>
                                </div>
                                <div class="col-6"><span>OR</span></div>
                                <div class="col-3">
                                    <div class="line r"></div>
                                </div>
                            </div>
                        </div> */}


                    <form onSubmit={sendData} class="myform">
                        <div class="form-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="fname" class="form-control fc" placeholder="First Name" onChange={(e) => { setfname(e.target.value) }} required />
                        </div>


                        <div class="form-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="lname" class="form-control fc" placeholder="Last Name" onChange={(e) => { setlname(e.target.value) }} required />
                        </div>


                        <div class="form-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="email" class="form-control fc" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} required />
                        </div>

                        <div class="form-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="type" class="form-control fc" placeholder="User Type" onChange={(e) => { settype(e.target.value) }} required />
                        </div>


                        <div class="form-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="username" class="form-control fc" placeholder="User Name" onChange={(e) => { setusername(e.target.value) }} required />
                        </div>


                        <div class="form-group">
                            <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="form-control fc" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} required />
                        </div>

                        <div class="form-group">
                            <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class="form-control fc" placeholder=" Confirm Password" onChange={(e) => { setconfpassword(e.target.value) }} required />
                        </div>

                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={password}
                            valueAgain={confpassword}
                            onChange={(isValid) => { }}
                        />

                        <div class="form-group mt-3"> <button type="submit" class="btn btn-block btn-primary btn-lg"><small><i class="far fa-user pr-2"></i>Create Your Account</small></button> </div>

                        <div class="row">
                            <div class="col-md-6 col-12"> Already you have an account</div><div class="col-md-6 col-12 bn">Login</div>
                        </div>

                    </form>
                    {/* </div> */}
                </div>
            </div>
        </div >

    </div >);


}

export default Register;
