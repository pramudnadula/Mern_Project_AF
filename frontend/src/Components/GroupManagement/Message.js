import React from 'react';
import img1 from '../../Assets/Images/user1.png';
import { format } from 'timeago.js'

function Message({ message, own, chat, uid }) {

    let index;
    let rindex;
    for (var i = 0; i < 2; i++) {
        if (chat.members[i] === uid) {
            index = i
        }
    }
    if (!own) {
        if (index === 0) {
            index = 1
        }
        else {
            index = 0
        }
    }


    return (
        <div className={own ? "msg nown" : "msg own"}>
            <div className='msgtop'>
                <img className='msgimg' src={chat.img[index] ? ("http://localhost:8070/" + chat.img[index]) : img1} />
                <p className='msgtext'>{message.text}</p>
            </div>

            <div className='msgbottom'>
                {format(message.createdAt)}
            </div>

        </div>
    );
}

export default Message;