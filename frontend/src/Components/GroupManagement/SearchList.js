import React from 'react';
import Conversation from './Conversation'
function SearchList({ datas, inp, gid }) {

    const filteredData = datas.filter((el) => {
        //if no input the return the original
        if (inp === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.fname.toLowerCase().includes(inp)
        }
    })
    return (
        <>
            {filteredData.map((stu, i) => (
                <Conversation send={true} user={stu} gid={gid} />

            ))}

        </>
    );
}

export default SearchList;