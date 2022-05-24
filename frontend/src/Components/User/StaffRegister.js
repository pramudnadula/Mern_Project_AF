
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"

function StaffRegister() {


    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [isSupervisor, setisSupervisor] = useState("")
    const [area, setarea] = useState("")
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
            isSupervisor: false,
            groups: 0,
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

    return (<div>

        <div className='home-div'> </div>

        <section className="hero is-fullheight-with-navbar all-home-flexs">

            <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                <div className="container is-widescreen">
                    <div className='content '>
                        <div className='columns is-justify-content-center'>
                            <div className='column is-3'>
                                <h2 className="subtitle is-2 is-semibold has-text-white has-text-centered">Staff Registration</h2>
                                <form onSubmit={sendData}>
                                    <div className="control has-text-white has-text-centered mb-4">

                                        <label className="radio" >
                                            <input type="radio" required value="Su" name="rad" />
                                            Supervisor
                                        </label>
                                        <label className="radio">
                                            <input type="radio" required value="Co" name="rad" />
                                            Co-Supervisor
                                        </label>
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" className="input is-primary" placeholder="First Name" onChange={(e) => { setfname(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="input is-primary" placeholder="Last Name" onChange={(e) => { setlname(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="email" className="input is-primary" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="area" className="input is-primary" placeholder="Area" onChange={(e) => { setarea(e.target.value) }} aria-describedby="basic-addon1" />
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" className="input is-primary" placeholder="Username" onChange={(e) => { setusername(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="input is-primary" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="input is-primary" placeholder="Confirm Password" onChange={(e) => { setconfpassword(e.target.value) }} aria-describedby="basic-addon1" required />
                                    </div>
                                    <PasswordChecklist
                                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                                        minLength={5}
                                        value={password}
                                        valueAgain={confpassword}
                                        onChange={(isValid) => { }}
                                    />



                                    <div>
                                        <input type="submit" value="Register" className="button is-link is-fullwidth" />
                                        {/* <Link to="/login"><button className="button is-danger is-fullwidth mt-2">Login</button></Link>
                <Link to='/'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to Home Page</button></Link> */}
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>










    </div>)
}

export default StaffRegister;




