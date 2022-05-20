import React from 'react';
import Conversation from './Conversation'
function SearchList({ datas, inp }) {

    const filteredData = datas.filter((el) => {
        //if no input the return the original
        if (inp === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(inp)
        }
    })
    return (
        <>
            {filteredData.map((stu, i) => (
                <Conversation send={true} />

            ))}

        </>
    );
}

export default SearchList;