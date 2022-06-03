
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Checkbox from './Checkbox';
import Registerpic from './../../Assets/Images/illustration.svg';
import './../../Assets/Styles/Register.css';
import { useSelector, useDispatch } from 'react-redux'
import { getareas } from '../../Actions/ResearchAreaActions';


function StaffRegister() {

    const [addarea, setaddarea] = useState([])
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

    // let arry = []
    // const { areas } = useSelector(state => state.areas);

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getareas())

    // }, [])


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
            area: ida,
            username,
            password
        };

        axios
            .post('http://localhost:8070/api/supervisors/', newUser)
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





    let arry = []
    ///////////////////////////////
    const handleFilters = (id) => {

        arry = id;
        setida(arry)

    }


    ///////////////////////////////////////

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
                            <div className="col-md-6"> <label className="labels">First Name</label><input type="text" className="form-control" placeholder="first name" onChange={(e) => { setfname(e.target.value) }} required /></div>
                            <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control" placeholder="last name" onChange={(e) => { setlname(e.target.value) }} required /></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" placeholder="enter email " onChange={(e) => { setemail(e.target.value) }} required /></div>
                            {/* <div className="col-md-12"><label className="labels">User Type</label><input type="text" className="form-control" placeholder="enter user type" onChange={(e) => { settype(e.target.value) }} /></div> */}
                        </div>
                        <br></br>
                        <div className="col-md-12"><label className="labels">Research Area </label></div>
                        <div className=" " style={{ display: 'contents !important' }}>
                            <Checkbox className="" areas={areas}
                                handleFilters={filters => handleFilters(filters, 'area')} />
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Username</label><input type="text" className="form-control" placeholder="enter username" onChange={(e) => { setusername(e.target.value) }} required /></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" placeholder="enter password" onChange={(e) => { setpassword(e.target.value) }} required /></div>
                            <div className="col-md-6"><label className="labels"> Confirm Password</label><input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="form-control" placeholder="enter  confirm password" onChange={(e) => { setconfpassword(e.target.value) }} required /></div>
                        </div>

                        <br></br>
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={password}
                            valueAgain={confpassword}
                            onChange={(isValid) => { }}
                        />



                        <div>
                            <input type="submit" value="Register" className="btn btn-success form-control" />
                            {/* <Link to="/login"><button className="button is-danger is-fullwidth mt-2">Login</button></Link>
                <Link to='/'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to Home Page</button></Link> */}
                        </div>


                    </form>





                </div>
            </div >


        </div>




    </div >)
}

export default StaffRegister;




