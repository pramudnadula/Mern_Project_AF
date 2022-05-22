import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/chat.css'
import img1 from '../../Assets/Images/user1.png';
function Conversations({ conversation, curentuserid }) {
    const [student, setStudent] = useState({})
    let index;
    let rindex;
    for (var i = 0; i < 2; i++) {
        if (conversation.members[i] === curentuserid) {
            index = i
        }
    }
    if (index === 0) {
        rindex = 1
    } else {
        rindex = 0
    }

    // useEffect(() => {
    //     const friendid = conversation.members.find((m) => m !== curentuserid)
    //     const getuser = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:8070/api/stu/get/${friendid}`);
    //             setStudent(res.data[0])


    //         } catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     getuser()

    // }, [conversation, curentuserid])
    return (
        <div className='conversation'>
            <img className='conversation_img' src={img1} />
            <span className='conversation_name'>
                {conversation.names[rindex]}
            </span>

        </div>
    );
}

export default Conversations;