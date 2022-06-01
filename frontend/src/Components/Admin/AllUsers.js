import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GET, DELETE } from '../../Helper/httpHelper';


function AllUsers() {
    const [student, setStudent] = useState([])



    useEffect(() => {


        GET(`user/all`).then((data) => {
            setStudent(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [student])



    // Delete student
    const DeleteStudent = (id) => {
        DELETE(`user/delete/${id}`).then((dat) => {
            alert("student Deleted");
        }).catch((err) => {
            console.log(err)
        })


    }


    return (
        <div>
            <div className='title is-2 has-text-black has-text-centered'>All Users</div><br />
            <h2 className='title is-4 has-text-centered'>Students</h2>
            < Link to="/addstudent"><button className="btn btn-success " type="submit">Add New Student</button></Link>

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
                                {student?.map((person, key) =>
                                    <tr key={key}>
                                        <td>{person.fname}</td>
                                        <td>{person.lname}</td>
                                        <td>{person.email}</td>
                                        <td>{person.type}</td>
                                        <td>

                                            <button className="btn btn-danger" style={{ marginRight: '.5rem' }} onClick={() => { if (window.confirm('Are you sure  delete a student?')) DeleteStudent(person._id) }} > Remove </button>
                                            <Link to={"/editstudent/" + person._id}> <button className="ml-3 btn btn-info" type="submit"> edit</button></Link>


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



export default AllUsers
