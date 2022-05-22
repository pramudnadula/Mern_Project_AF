import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../Assets/Styles/UserProfile.css';
import axios from 'axios';

function UserProfile({ setTest }) {
    const user = (localStorage.getItem("user"))
    //setTest(user)
    const [currentUser, setcurrentUser] = useState("")

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");






    useEffect(() => {
        const token = localStorage.getItem("token");
        try {
            axios({
                method: "get",
                baseURL: `http://localhost:8070/user/getuser/${userId}`,
                headers: {
                    Authorization: "Bearer " + token
                },
            }).then(res => {
                setcurrentUser(res.data.user)
                console.log(res.data)
            })
        } catch (err) {
            throw err;
        }
    }, [])




    return (<div>

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" /><span className="font-weight-bold">Amelly</span><span className="text-black-50">amelly12@bbb.com</span><span> </span>

                        {/* <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Upload New Picture </button></div> */}
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Remove</button></div>
                        <div className="mt-5 text-center"> <Link to={"/update/" + currentUser._id}><button className="btn btn-primary profile-button" type="submit">Update</button></Link></div>


                    </div>
                </div>


                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" value={currentUser.fname} readOnly /></div>
                            <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" value={currentUser.lname} placeholder="last name" readOnly /></div>
                        </div>
                        <div className="row mt-3">
                            {/* <div className="col-md-12"><label className="labels">PhoneNumber</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                            <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control" placeholder="enter address" value="" /></div> */}
                            <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" placeholder="enter email " value={currentUser.email} readOnly /></div>
                            <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" value={currentUser.type} readOnly /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" value={currentUser.username} readOnly /></div>
                            <div className="col-md-6"><label className="labels">Password</label><input type="text" className="form-control" value={currentUser.password} placeholder="enter password" readOnly /></div>
                        </div>
                        {/* <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div> */}
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
        </div >




    </div >);




}

export default UserProfile;