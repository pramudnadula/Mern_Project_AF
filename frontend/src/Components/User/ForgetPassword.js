import { message } from 'antd';
import { send } from 'process';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { POST } from '../../Helper/httpHelper';




function ForgetPassword() {
    const [email, setEmail] = useState("")

    const sendData = (e) => {
        e.preventDefault()
        POST('user/resetpassword', { email }).then((data) => {
            if (data.sta) {
                message.success("Email send to your Email")
            }
            else {
                message.error("Email is Invalid")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5" style={{ width: '600px' }} >
                <h4>Forget Password</h4>

                <form onSubmit={sendData}>

                    <div className="row mt-3" style={{ width: '209%' }}>
                        <div className="col-md-6"><input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="enter email" /></div>
                    </div>

                    <div className="mt-5 text-center">
                        <button className="btn btn-success form-control" style={{ width: '180px' }} type="submit" value="Submit">submit</button>
                    </div>
                    <br></br>
                </form>
            </div>

        </div>

    )
}



export default ForgetPassword
