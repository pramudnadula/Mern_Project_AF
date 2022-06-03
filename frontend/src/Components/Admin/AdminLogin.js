import React, { useState } from "react";
import axios from 'axios';
//import { Link } from "react-router-dom";


function AdminLogin() {

    const [userName, setuserName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [test, setTest] = useState(false)
    const [userId, setUserId] = useState('')


    function sendData(e) {
        e.preventDefault();
        const newUser = {
            email: email,
            password,
        };

        axios
            .post('http://localhost:8070/admin/login', newUser)
            .then((res) => {

                if (res.status !== 200) {
                    console.log(res)

                }
                localStorage.setItem("admin", JSON.stringify(res.data.userId))
                localStorage.setItem("admin-token", res.data.token)

                console.log(res.data.token)
                setUserId(res.data.userId)
                setTest(!test)

                window.location.href = '/admindashboard'

            })
            .catch((err) => {
                alert("Email or Password is worng");
                console.log(err)
            });
    }





    return (<>

        <div className="container rounded bg-white mt-5 mb-5" style={{ width: '500px' }} >
            <h4>Admin Login</h4>

            <form onSubmit={sendData}>


                <div className="row mt-3" style={{ width: '208%' }}>
                    <div className="col-md-6"><input type="email" className="form-control" placeholder="Email Address" onChange={(e) => { setemail(e.target.value) }} required /></div>
                </div>
                <div className="row mt-3" style={{ width: '208%' }}>
                    <div className="col-md-6"> <input type="password" className="form-control" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} required /></div>
                </div>
                <br></br>
                {/* <div className="mt-5 text-center"> */}
                <button type="submit" className="btn btn-success form-control">Login</button>
                <br></br>
                <div></div>

            </form>

        </div>

    </>
    );
}

export default AdminLogin;
