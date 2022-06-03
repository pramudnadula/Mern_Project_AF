import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper';

function MyContacts(props) {
    const uid = localStorage.getItem("user") || localStorage.getItem("staff")

    const [contacts, setcontacts] = useState([])
    useEffect(() => {
        POST('api/admincontact/getspecific', { uid }).then((data) => {
            setcontacts(data)

        }).catch((err) => {
            console.log(err)
        })
    }, [contacts])

    const deletecontact = async (id) => {
        try {
            await POST('api/admincontact/deletecontact', { id })
            message.success("Deleted")

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='col-10 mt-5'>
            <h3 className='text-center mb-4'>My Questions</h3>
            {contacts.length > 0 ? <>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Subject</th>
                            <th>Question</th>
                            <th>Reply</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts?.map((m, i) => (
                            <tr key={i}>
                                <td>{(i + 1)}</td>

                                <td>{m.subject}</td>
                                <td>{m.question}</td>
                                <td>{m.reply == "" ? <><div className='badge bg-warning'>No reply</div></> : <>{m.reply}</>}</td>
                                <td><button onClick={(er) => { deletecontact(m._id) }} className='btn btn-danger'><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                            </tr>

                        ))}


                    </tbody>
                </table>
            </> : <>
                <h5 className='text-center m-5' style={{ color: "grey" }}>You have not asked any questions yet</h5>
            </>}




        </div >
    );
}

export default MyContacts;