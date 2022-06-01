import React from 'react'
import { Link } from 'react-router-dom';




function ForgetPassword() {
    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5" style={{ width: '600px' }} >
                <h4>Forget Password</h4>

                <form >

                    <div className="row mt-3" style={{ width: '209%' }}>
                        <div className="col-md-6"><input type="email" className="form-control" placeholder="enter email" /></div>
                    </div>

                    <div className="mt-5 text-center">
                        < Link to="/resetpassword"><button className="btn btn-success form-control" style={{ width: '180px' }} type="submit" value="Submit">submit</button></Link>
                    </div>
                    <br></br>
                </form>
            </div>

        </div>

    )
}



export default ForgetPassword
