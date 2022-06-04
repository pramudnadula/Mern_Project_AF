import React from 'react';
import { Comment, Avatar, Popconfirm } from 'antd';
import { on } from 'events';
import defpic from '../../Assets/Images/user1.png'
function Comments({ children, ob }) {
    const addreply = async () => {

    }

    return (
        <Comment
            actions={[

                <Popconfirm
                    placement="rightBottom"
                    title={<><h5>Enter the Reply</h5>
                        <textarea onChange={(e) => { setreply(e.target.value) }} cols="20" rows="3"></textarea>
                    </>}
                    onConfirm={(e) => { sendData(m._id) }}
                    okText="Yes"
                    cancelText="No"
                >
                    <span key="comment-nested-reply-to" className='badge bg-info'>Reply</span>
                </Popconfirm>

            ]}
            author={<a>{ob?.uid?.fname}</a>}
            avatar={<Avatar src={ob?.uid?.image ? ("http://localhost:8070/" + ob?.uid?.image) : defpic} alt="Han Solo" />}
            content={
                <p>
                    {ob?.question}
                </p>
            }
        >
            {children}
        </Comment>
    );
}

export default Comments;