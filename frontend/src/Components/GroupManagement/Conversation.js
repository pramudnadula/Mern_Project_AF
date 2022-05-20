import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import defpic from '../../Assets/Images/user1.png';
import { SendOutlined } from '@ant-design/icons';
import { checkstudent } from '../../Actions/StudentActions';
function Conversations({ conversation, curentuserid, send }) {
    const [student, setStudent] = useState(null)
    const dispatch = useDispatch()

    const hanldechek = () => {
        if (send) {
            dispatch(checkstudent("626cec367390cfb0c996cf1c", "626c3d7400515963c30d7f2b"))

        }
    }




    return (
        <div className='conversation' onClick={hanldechek}>
            <img className='conversation_img' src={defpic} />
            <span className='conversation_name'>
                Kavindu chamith
            </span>
            {send ? (<SendOutlined className='sendicon mr-4' />) : ''}
        </div>
    );
}

export default Conversations;