import React, { useEffect } from 'react';
import { GET } from '../../Helper/httpHelper';

function MyContacts(props) {
    const uid = localStorage.getItem("user") || localStorage.getItem("staff")

    return (
        <div className='col-10'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Subject</th>
                        <th>Question</th>
                        <th>Reply</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

        </div>
    );
}

export default MyContacts;