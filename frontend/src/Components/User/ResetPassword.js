import React from 'react'
import { Link } from 'react-router-dom';


function ResetPassword() {
    return (
        <div>
            <div className="container rounded bg-white mt-5 mb-5" style={{ width: '500px' }}>
                <h4>Add New Password</h4>

                <form >

                    <div className="row mt-3" style={{ width: '208%' }} >
                        <div className="col-md-6"><input type="password" className="form-control" placeholder="enter new password" /></div>
                    </div>

                    <div className="mt-5 text-center">
                        < Link to="/"><button className="btn btn-success form-control" style={{ width: '173px' }} type="submit" value="Submit">submit</button></Link>
                    </div>
                    <br></br>
                </form>
            </div>
        </div>
    )
}



export default ResetPassword
