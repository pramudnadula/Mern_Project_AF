import React from 'react';
import Conversation from './Conversation'
import ConversationOut from './ConversationOut';
function SearchListOut({ datas, inp, gid }) {

    const filteredData = datas.filter((el) => {
        //if no input the return the original
        if (inp === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.fname?.toLowerCase().includes(inp)
        }
    })
    return (
        <>
            {filteredData.map((stu, i) => (
                <ConversationOut send={true} user={stu} gid={gid} />

            ))}

        </>
    );
}

export default SearchListOut;