import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GET, DELETE } from '../../Helper/httpHelper';


function AllSupervisors() {

    const [supervisor, setSupervisor] = useState([])

    useEffect(() => {


        GET(`api/supervisor/all`).then((data) => {
            setSupervisor(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [supervisor])


    // Delete student
    const DeleteStaff = (id) => {
        DELETE(`api/supervisors/delete/${id}`).then((dat) => {
            alert(" staff Deleted");
        }).catch((err) => {
            console.log(err)
        })


    }

    return (
        <div className='container'>
            <h2 className='title is-4 has-text-centered'>Supervisors</h2>
            < Link to="/addstaff"><button className="btn btn-success " type="submit">Add New Supervisor</button></Link>
            <div className='card mt-2'>
                <div className="row d-flex justify-content-center ">
                    <div className="col">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th style={{ width: '173px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supervisor?.map((staff, i) =>
                                    <tr key={i}>
                                        <td>{staff.fname}</td>
                                        <td>{staff.lname}</td>
                                        <td>{staff.email}</td>
                                        <td>
                                            <button className="btn btn-danger" style={{ marginRight: '.5rem' }} onClick={() => { if (window.confirm('Are you sure  delete a staff member?')) DeleteStaff(staff._id) }}> Remove </button>
                                            <Link to={"/editstaff/" + staff._id}> <button className="ml-3 btn btn-info" type="submit"> edit</button></Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AllSupervisors
