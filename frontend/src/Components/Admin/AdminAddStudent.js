import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Registerpic from './../../Assets/Images/illustration.svg';
import './../../Assets/Styles/UserProfile.css';
import PasswordChecklist from "react-password-checklist"

function AdminAddStudent() {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
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
            username,
            password
        };

        axios
            .post('http://localhost:8070/user/add', newUser)
            .then(() => {
                alert('User Create Successfully ');
                setemail('');
                setfname('');
                setlname('');
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





    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">


                    <div className="col-md-3 border-right">
                        {/* <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" /><span className="font-weight-bold">Amelly</span><span className="text-black-50">amelly12@bbb.com</span><span> </span>
                        </div> */}
                    </div>


                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Add New Student</h4>
                            </div>


                            <form onSubmit={sendData}>

                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" onChange={(e) => { setfname(e.target.value) }} /></div>
                                    <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" placeholder="last name" onChange={(e) => { setlname(e.target.value) }} /></div>
                                </div>

                                <div className="row mt-3">

                                    <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" placeholder="enter email " onChange={(e) => { setemail(e.target.value) }} /></div>
                                    {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" onChange={(e) => { settype(e.target.value) }} /></div> */}
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

                                <div className="text-center ">
                                    <input type="submit" value="Add Student" className="btn btn-success form-control" />
                                </div>

                                <div className="mt-5 text-center">
                                    {/* < Link to="/userprofile"><button className="btn btn-primary profile-button" type="submit" value="Save Profile">Cancel</button></Link> */}
                                </div>

                            </form>

                        </div>
                    </div>


                    {/* 
			<div className="col-md-4">
				<div className="p-3 py-5">
					<div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br />
					<div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" /></div> <br />
					<div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" /></div>
				</div>
			</div> */}

                </div>
            </div>
        </div>
    )
}



export default AdminAddStudent
