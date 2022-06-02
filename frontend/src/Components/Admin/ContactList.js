import React from 'react';

function ContactList(props) {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-10'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>No:</tr>
                            <tr>Name</tr>
                            <tr>Email</tr>
                            <tr>Subject</tr>
                            <tr>Question</tr>
                        </thead>
                    </table>
                </div>
            </div>
            <table>

            </table>
        </div>
    );
}

export default ContactList;