import React, { useEffect } from 'react';
import { getareas } from '../Actions/ResearchAreaActions';
import homeimage from '../Assets/Images/2.png';
import NavBar_Home from '../Components/Home/NavBar_Home';
import { useSelector, useDispatch } from 'react-redux'


function Home(props) {
    const dispatch = useDispatch()
    const { rareas } = useSelector(state => state.areas);
    useEffect(() => {
        dispatch(getareas())
        // LoadfilterResults(myFilters.filters)
    }, [])

    return (
        <>

            <div className='container-fluid home1'>
                <NavBar_Home />

                <div className='row justify-content-center align-items-center' style={{marginTop:'12%'}}>
                    <div className='col-xl-6 col-sm-6'>
                        <div className='row justify-content-center'>
                            <h1 className='text-center m-5 home_h1 col-10'>Research Management System</h1>
                            <div className='col-10'>
                                <p className='home_text'>A research management system (RMS), is a place to discover, store, annotate and share research files</p>
                            </div>

                        </div>

                    </div>
                    <div className='col-xl-6 col-sm-6 pic_container'>
                        <img className='img-fluid d-block' src={homeimage} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;