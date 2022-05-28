import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './../../Assets/Styles/UserProfile.css';
import PasswordChecklist from "react-password-checklist"
import axios from 'axios';
import { GET, PUT } from '../../Helper/httpHelper';

function StaffUpdate(props) {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    // const [area, setarea] = useState("")
    const [password, setpassword] = useState("")
    const [confpassword, setconfpassword] = useState("")
    const params = useParams()
    // const token = localStorage.getItem("token");
    const staffId = localStorage.getItem("staff");

    useEffect(() => {
        getData()
    }, [])
    //get data from profile page
    function getData() {
        GET(`api/supervisors/${staffId}`)
            .then((res) => {
                setfname(res.user.fname)
                setlname(res.user.lname)
                setemail(res.user.email)
                setusername(res.user.username)
                // setarea(res.data.user.area)
                setpassword(res.user.password)
                setconfpassword(res.user.password)
            }).catch((err) => {
                alert(err.message);
            })
        console.log(params.id)

    }
    //send to updated data to 
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

        PUT(`api/supervisors/update/${staffId}`, newUser)
            .then(() => {
                alert('User Updated, Click ok');
                window.location.href = '/staffprofile';


            })
            .catch((err) => {
                alert(err);
            });
    }






    return (<div>

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" /><span className="font-weight-bold">Amelly</span><span className="text-black-50">amelly12@bbb.com</span><span> </span>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Upload New Picture </button></div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Remove</button></div>
                        {/* <div className="mt-5 text-center"> <Link to={"/update/" + currentUser._id}><button className="btn btn-primary profile-button" type="button">Update</button></Link></div> */}
                    </div>
                </div>


                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Edit Profile</h4>
                        </div>


                        <form onSubmit={sendData}>
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" value={fname} onChange={(e) => { setfname(e.target.value) }} /></div>
                                <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" value={lname} placeholder="last name" onChange={(e) => { setlname(e.target.value) }} /></div>
                            </div>

                            <div className="row mt-3">

                                <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" placeholder="enter email " value={email} onChange={(e) => { setemail(e.target.value) }} /></div>
                                {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" value={type} onChange={(e) => { settype(e.target.value) }} /></div> */}
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" value={username} onChange={(e) => { setusername(e.target.value) }} /></div>

                            </div>

                            <div className="row mt-3">
                                <div className="col-md-6"><label className="labels">Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" value={password} placeholder="enter password" onChange={(e) => { setpassword(e.target.value) }} /></div>
                                <div className="col-md-6"><label className="labels"> Confirm Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" value={confpassword} placeholder="enter  confirm password" onChange={(e) => { setconfpassword(e.target.value) }} /></div>
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
                                <input type="submit" value="Update" className="btn btn-success form-control" />
                            </div>

                            <div className="mt-5 text-center">
                                < Link to="/staffprofile"><button className="btn btn-primary profile-button" type="submit" value="Save Profile">Cancel</button></Link>
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
        </div >




    </div >
    );




}

export default StaffUpdate;