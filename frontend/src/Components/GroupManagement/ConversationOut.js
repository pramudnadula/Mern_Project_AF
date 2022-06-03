import axios from 'axios';
import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import defpic from '../../Assets/Images/user1.png';
import { SendOutlined } from '@ant-design/icons';
import { checkstudent } from '../../Actions/StudentActions';
import { POST } from '../../Helper/httpHelper';
function ConversationOut({ user, send, gid }) {
    // const [student, setStudent] = useState(null)
    // const dispatch = useDispatch()

    // const hanldechek = () => {
    //     if (send) {
    //         dispatch(checkstudent("626cec367390cfb0c996cf1c", "626c3d7400515963c30d7f2b"))

    //     }
    // }
    const uid = localStorage.getItem("user")

    const sendrequest = async (id) => {
        const ob = {
            sid: uid,
            rid: id
        }
        const r = await POST("api/conversation/check", ob)
        console.log(r)
        if (r.resu) {
            POST('api/conversation/createout', ob).then((data) => {
                message.success("Message Send")

            }).catch((err) => {
                console.log(err)
            })
        } else {
            message.error("Already send a Msg")
        }

    }




    return (
        <div className='conversation'>
            <img className='conversation_img' src={user.image ? ("http://localhost:8070/" + user.image) : defpic} />
            <span className='conversation_name'>
                {user?.fname}
            </span>
            <div className='sb'>
                {send ? (<Tooltip title={"Say Hi to " + user.fname}><button onClick={(e) => { sendrequest(user._id) }} className="btn btn-primary btn-circle btn-circle-sm m-1"><i className="fa fa-commenting-o" aria-hidden="true"></i></button></Tooltip>) : ''}
            </div>

        </div>
    );
}

export default ConversationOut;