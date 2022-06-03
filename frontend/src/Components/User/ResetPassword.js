import { message } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { POST } from '../../Helper/httpHelper';


function ResetPassword(props) {
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const sendData = (e) => {
        e.preventDefault()
        if (password != repassword) {
            message.error("Password mismatch")
            return;
        }
        const ob = {
            uid: props.match.params.token,
            password
        }
        POST('user/changepassword', ob).then((data) => {
            if (data.stat) {
                message.success("password changed")
                window.location = '/login'
            }
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5" style={{ width: '500px' }}>
                <h4>Add New Password</h4>

                <form onSubmit={sendData}>

                    <div className="row mt-3" style={{ width: '208%' }} >
                        <div className="col-md-6"><input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="enter new password" required /></div>
                    </div>
                    <div className="row mt-3" style={{ width: '208%' }} >
                        <div className="col-md-6"><input type="password" onChange={(e) => { setRepassword(e.target.value) }} className="form-control" placeholder="enter password again" /></div>
                    </div>

                    <div className="mt-5 text-center">
                        <button className="btn btn-success form-control" style={{ width: '173px' }} type="submit" value="Submit">Change</button>
                    </div>
                    <br></br>
                </form>
            </div >
        </div >
    )
}



export default ResetPassword
