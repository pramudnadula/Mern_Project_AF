import React from 'react';
import img1 from '../../Assets/Images/user1.png';
import { format } from 'timeago.js'

function Message({ message, own }) {
    return (
        <div className={own ? "msg own" : "msg"}>
            <div className='msgtop'>
                <img className='msgimg' src={img1} />
                <p className='msgtext'>{message.text}</p>
            </div>

            <div className='msgbottom'>
                {format(message.createdAt)}
            </div>

        </div>
    );
}

export default Message;