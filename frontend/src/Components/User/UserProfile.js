import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../Assets/Styles/UserProfile.css';
import axios from 'axios';
import { GET, POST } from '../../Helper/httpHelper';


function UserProfile({ setTest }) {
    const user = (localStorage.getItem("user"))
    //setTest(user)
    const [currentUser, setcurrentUser] = useState("")
    //const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    const [profileDate, setProfileDate] = useState()



    useEffect(() => {
        Getoneuser();
    }, [])

    const Getoneuser = () => {
        //const token = localStorage.getItem("token");
        try {
            GET(`user/getuser/${userId}`).then(res => {
                setcurrentUser(res.user)
                console.log(res)
            })
        } catch (err) {
            throw err;
        }
    }

    //upload image
    const fileChangeHandler = (e) => {
        setProfileDate(e.target.files[0]);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const data = new FormData();
        data.append("uid", userId)
        data.append('proimage', profileDate)


        POST(`user/profileimage`, data).then(() => {

            console.log("File Sent Successfull")
            Getoneuser();
        })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (<div>

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" style={{ width: '180px' , height:'180px'}}  src={"http://localhost:8070/" + currentUser.image} /><span className="font-weight-bold" value={currentUser.fname} ></span><span className="text-black-50" value={currentUser.fname}></span><span> </span>
                        <form onSubmit={onSubmitHandler}>
                            <div className="field has-addons m-3 pt-3">
                                <div className="control is-expanded">
                                    <div className="is-fullwidth">
                                        <input className="form-control" type="file" name="proimage" accept = "application/.png,.jpg,.jpeg,.jfif"  onChange={fileChangeHandler} />
                                    </div>
                                </div>

                                <div className=" has-background-danger-light pt-1 pb-2">
                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                        <button className="btn btn-danger" type='submit' value="Create" >upload profile</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="col-md-8 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control " placeholder="first name" value={currentUser.fname} readOnly /></div>
                            <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" value={currentUser.lname} placeholder="last name" readOnly /></div>
                        </div>
                        <div className="row mt-3">
                            {/* <div className="col-md-12"><label className="labels">PhoneNumber</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                            <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control" placeholder="enter address" value="" /></div> */}
                            <div className="col-md-12"><label className="labels">Email </label><input type="email" className="form-control" placeholder="enter email " value={currentUser.email} readOnly /></div>
                            {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" value={currentUser.type} readOnly /></div> */}
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" value={currentUser.username} readOnly /></div>
                            <div className="col-md-6"><label className="labels">Password</label><input type="password" className="form-control" value={currentUser.password} placeholder="enter password" readOnly /></div>
                        </div>

                        <div className="mt-5 text-center">
                            <Link to={"/update/" + currentUser._id}><button className="btn btn-success form-control" type="submit">Update</button></Link></div>
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