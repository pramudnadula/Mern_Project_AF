import React, { useState } from 'react';
import '../../Assets/Styles/help.css'
import ContactAdmin from './ContactAdmin';
import Help_step from './help_step';

function Help(props) {



    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <Help_step />
                <ContactAdmin />
            </div>
            <div className='row'>

            </div>

        </div>
    );
}

export default Help;