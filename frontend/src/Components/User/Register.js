import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Registerpic from './../../Assets/Images/illustration.svg';
import './../../Assets/Styles/Register.css';
// import './../../Assets/Styles/UserProfile.css';
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

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row ">

                <div className="col-md-6 border-right ">
                    <br></br>
                    <br></br>
                    <img src={Registerpic} alt="Image" className="img-fluid" />
                </div>
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    {/* <div className="card py-3 px-2"> */}
                    <h3>Create an Account</h3>


                    <form onSubmit={sendData} >

                        <div className="row mt-2">
                            <div className="col-md-6"> <label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" onChange={(e) => { setfname(e.target.value) }} required /></div>
                            <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" placeholder="last name" onChange={(e) => { setlname(e.target.value) }} required /></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" placeholder="enter email " onChange={(e) => { setemail(e.target.value) }} required /></div>
                            {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" onChange={(e) => { settype(e.target.value) }} /></div> */}
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" onChange={(e) => { settype(e.target.value) }} /></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" onChange={(e) => { setusername(e.target.value) }} /></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" placeholder="enter password" onChange={(e) => { setpassword(e.target.value) }} /></div>
                            <div className="col-md-6"><label className="labels"> Confirm Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" placeholder="enter  confirm password" onChange={(e) => { setconfpassword(e.target.value) }} /></div>
                        </div>

                        <br></br>
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={password}
                            valueAgain={confpassword}
                            onChange={(isValid) => { }}
                        />

                        <div className="text-center"> <button type="submit" className="btn btn-success form-control"><small>Create Your Account</small></button> </div>
                        <br></br>
                        < Link to="/"><button className="btn btn-primary form-control" type="submit" value=" ">Back To Home</button></Link>

                    </form>
                    {/* </div> */}
                </div>
            </div>
        </div >

    </div >);


}

export default Register;
