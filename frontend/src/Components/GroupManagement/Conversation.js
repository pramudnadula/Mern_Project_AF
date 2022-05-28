import axios from 'axios';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import defpic from '../../Assets/Images/user1.png';
import { SendOutlined } from '@ant-design/icons';
import { checkstudent } from '../../Actions/StudentActions';
import { POST } from '../../Helper/httpHelper';
function Conversation({ user, send, gid }) {
    // const [student, setStudent] = useState(null)
    // const dispatch = useDispatch()

    // const hanldechek = () => {
    //     if (send) {
    //         dispatch(checkstudent("626cec367390cfb0c996cf1c", "626c3d7400515963c30d7f2b"))

    //     }
    // }

    const sendrequest = (id) => {
        const ob = {
            group: gid,
            reciever: id
        }
        POST('api/request/', ob).then((data) => {
            message.success("Request Send")
        }).catch((err) => {
            console.log(err)
        })
    }




    return (
        <div className='conversation'>
            <img className='conversation_img' src={defpic} />
            <span className='conversation_name'>
                {user?.fname}
            </span>
            <div className='sb'>
                {send ? (<button onClick={(e) => { sendrequest(user._id) }} className="btn btn-info btn-circle btn-circle-sm m-1"><i className="fa fa-paper-plane"></i></button>) : ''}
            </div>

        </div>
    );
}

export default Conversation;