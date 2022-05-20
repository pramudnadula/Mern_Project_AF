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

                <div className='row'>
                    <div className='col-6'>
                        <div className='row justify-content-center'>
                            <h1 className='text-center m-5 home_h1 col-10'>Research Management</h1>
                            <div className='col-10'>
                                <p className='home_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </p>
                            </div>

                        </div>

                    </div>
                    <div className='col-xl-6  pic_container'>
                        <img className='img-fluid d-block' src={homeimage} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;