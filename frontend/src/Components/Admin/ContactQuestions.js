import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../Helper/httpHelper';
import { Popconfirm, message, Button } from 'antd';


function ContactQuestions(props) {
    const [qustions, setquestions] = useState([])
    const [reply, setreply] = useState('')

    useEffect(() => {
        getdata()
    }, [qustions])

    const getdata = () => {
        GET('api/admincontact/getall').then((data) => {
            setquestions(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const sendData = async (id) => {
        if (reply == "") {
            message.error("Please Enter the reply")
            return;
        }
        const res = await POST('api/admincontact/addreply', { cid: id, reply })
        if (res.sta) {
            message.success("Replay Added Successfully")
        }

    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <h3 className='text-center mt-5 mb-4'>User Questions</h3>
                <div className='col-12'>
                    <table className='table table-bordered bg-light'>
                        <thead>
                            <tr>
                                <th>No:</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Question</th>
                                <th>Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qustions.map((m, i) => (
                                <tr key={i}>
                                    <td>{(i + 1)}</td>
                                    <td>{m.name}</td>
                                    <td>{m.utype == "us" ? <><div className='badge bg-primary'>Student</div></> : <><div className='badge bg-primary'>Staff</div></>}</td>
                                    <td>{m.email}</td>
                                    <td>{m.subject}</td>
                                    <td>{m.question}</td>
                                    <td>{m.reply === "" ? (<Popconfirm
                                        placement="rightBottom"
                                        title={<><h5>Enter the Reply</h5>
                                            <textarea onChange={(e) => { setreply(e.target.value) }} cols="20" rows="3"></textarea>
                                        </>}
                                        onConfirm={(e) => { sendData(m._id) }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button className='btn btn-warning'>Reply</button>
                                    </Popconfirm>) : m.reply}</td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>



        </div>
    );
}

export default ContactQuestions;