import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Checkbox from './Checkbox';
import { useSelector, useDispatch } from 'react-redux'
import { getareas } from '../../Actions/ResearchAreaActions';


function AdminAddStaff() {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [isSupervisor, setisSupervisor] = useState("")
    const [area, setarea] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confpassword, setconfpassword] = useState("")
    const [users, setUsers] = useState([])

    const [type, settype] = useState()
    const [areas, setareas] = useState([])
    const [ida, setida] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8070/api/researchareas/list')
            .then((data) => {

                setareas(data.data)
            })

    })

    function sendData(e) {
        e.preventDefault();

        if (confpassword === password) {

        }
        else {
            return (alert("Password Doesn't match"))
        }
        let ty
        if (type == "Su") {
            ty = true
        }
        else {
            ty = false
        }
        const newUser = {
            fname,
            lname,
            email,
            isSupervisor: ty,
            groups: 0,
            // area,
            username,
            password
        };

        axios
            .post('http://localhost:8070/api/supervisors/add', newUser)
            .then(() => {
                alert('User Create Successfully ');
                setemail('');
                setfname('');
                setlname('');
                setisSupervisor('');
                setarea('');
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

    const handleFilters = (id) => {

        arry = id;
        setida(arry)
    }




    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">

                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" /><span className="font-weight-bold">Amelly</span><span className="text-black-50">amelly12@bbb.com</span><span> </span>
                        </div>
                    </div>


                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Add New Staff</h4>
                            </div>

                            <form onSubmit={sendData}>
                                <div className="control has-text-white has-text-centered mb-4">

                                    <label className="radio" >
                                        <input onChange={(e) => { settype(e.target.value) }} type="radio" required value="Su" name="rad" />
                                        Supervisor
                                    </label>
                                    <label className="radio">
                                        <input onChange={(e) => { settype(e.target.value) }} type="radio" required value="Co" name="rad" />
                                        Co-Supervisor
                                    </label>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control" placeholder="First Name" onChange={(e) => { setfname(e.target.value) }} required /></div>
                                    <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" placeholder="Last Name" onChange={(e) => { setlname(e.target.value) }} required /></div>
                                </div>

                                <div className="row mt-3">

                                    <div className="col-md-12"><label className="labels">Email </label><input type="email" className="form-control" placeholder="Email " onChange={(e) => { setemail(e.target.value) }} required /></div>
                                    {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" onChange={(e) => { settype(e.target.value) }} /></div> */}
                                </div>


                                {/* <div className="mb-3">
                                        <input type="area" className="input is-primary" placeholder="Area" onChange={(e) => { setarea(e.target.value) }} aria-describedby="basic-addon1" />
                                    </div> */}

                                <div className=" " style={{ display: 'contents !important' }}>
                                    <Checkbox className="" areas={areas}
                                        handleFilters={filters => handleFilters(filters, 'area')} />
                                </div>

                                <div className="row mt-3"></div>
                                <div className="col-md-12"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" onChange={(e) => { setusername(e.target.value) }} /></div>



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
                                    <input type="submit" value="Register" className="btn btn-success form-control" />
                                    {/* <Link to="/login"><button className="button is-danger is-fullwidth mt-2">Login</button></Link>
                <Link to='/'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to Home Page</button></Link> */}
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}



export default AdminAddStaff
