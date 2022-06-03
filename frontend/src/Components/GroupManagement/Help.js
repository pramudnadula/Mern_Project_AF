import React, { useState } from 'react';
import '../../Assets/Styles/help.css'
import ContactAdmin from './ContactAdmin';
import Help_step from './help_step';
import MyContacts from './MyContacts';

function Help(props) {
    let staff = false
    if (localStorage.getItem("staff")) {
        staff = true
    }


    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <Help_step staff={staff} />
                <ContactAdmin />
            </div>
            <div className='row justify-content-center'>
                <MyContacts />
            </div>

        </div>
    );
}

export default Help;