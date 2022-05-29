import React from 'react'
import { Link } from 'react-router-dom';


function AllUsers() {
    return (
        <div>
            <div className='title is-2 has-text-black has-text-centered'>All Users</div><br />
            <h2 className='title is-4 has-text-centered'>Students</h2>
            < Link to="/register"><button className="btn btn-success " type="submit">Add New Student</button></Link>

            <div className='card mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Group</th>
                                    <th style={{ width: '173px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>kamal</td>
                                <td>perera</td>
                                <td>kamal123@gmail.com</td>
                                <td>2</td>
                                <td>

                                    <button className="btn btn-danger" style={{ marginRight: '.5rem' }} > Remove </button>
                                    <button className="ml-3 btn btn-info"  > edit</button>

                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>




            <h2 className='title is-4 has-text-centered'>Supervisors</h2>
            < Link to="/staffregister"><button className="btn btn-success " type="submit">Add New Supervisor</button></Link>
            <div className='card mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Group</th>
                                    <th style={{ width: '173px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>kamal</td>
                                <td>perera</td>
                                <td>kamal123@gmail.com</td>
                                <td>2</td>
                                <td><a className='button is-danger' ><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default AllUsers
