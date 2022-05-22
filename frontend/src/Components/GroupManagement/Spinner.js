import React from 'react';
import { Spin } from 'antd';
function Spinner(props) {
    return (
        <div className='spinner'>
            <Spin size='large' />
        </div>
    );
}

export default Spinner;