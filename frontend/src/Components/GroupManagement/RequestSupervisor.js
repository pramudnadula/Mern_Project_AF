import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getareas } from '../../Actions/ResearchAreaActions';
import { groups } from './GroupNum'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox';
import Card1 from './Card1'
import '../../Assets/Styles/Supervisor.css';
import { getfiltersupervisors } from '../../Actions/SupervisorActions'
import { Radio } from 'antd';
import Layout1 from '../../Layouts/Layout1';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import axios from 'axios';
import { Switch } from 'antd';
import { GET } from '../../Helper/httpHelper';

function RequestSupervisor({ isSupervisor, stype }) {

    const [limit, setlimit] = useState(6)
    const [skip, setskip] = useState(0)
    const [type, settype] = useState(false);
    const [size, setsize] = useState(0)
    const [dgroup, setdgroup] = useState()
    const [filterResults, setfilterResults] = useState(0)
    const [myFilters, setmyFilters] = useState({
        filters: { area: [], groups: [] }
    })
    const { rareas } = useSelector(state => state.areas);
    const dispatch = useDispatch()
    const gid = localStorage.getItem("gid")

    useEffect(() => {
        dispatch(getareas())
        LoadfilterResults(myFilters.filters)
        if (gid) {
            GET(`api/studentGroups/${gid}`).then((data) => {
                setdgroup(data)

            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])
    const handleFilters = (filters, filterby) => {
        const newfilter = { ...myFilters }
        newfilter.filters[filterby] = filters
        if (filterby == "groups") {
            let pricevalues = handleprice(filters)
            newfilter.filters[filterby] = pricevalues
        }
        LoadfilterResults(myFilters.filters)
        setmyFilters(newfilter)
    }
    function handleprice(values) {
        const data = groups
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(values)) {
                array = data[key].array
            }
        }
        return array;
    }


    function LoadfilterResults(newfilter) {

        getfiltersupervisors(skip, limit, newfilter, isSupervisor).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults(data.data)
                setsize(data.size)
                setskip(0)
            }
        })
    }

    const loadmorebutton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='btn btn-warning mb-5' onClick={loadmore}>
                    loadMore
                </button>
            )
        )
    }

    const searchbar = () => {
        return (
            <Paper

                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={isSupervisor ? "Search Supervisors" : "Search Co-Supervisors"}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            </Paper>
        )
    }

    function loadmore() {
        let toskip = skip + limit
        getfiltersupervisors(toskip, limit, myFilters.filters).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults([...filterResults, ...data.data])
                setsize(data.size)
                setskip(toskip)
            }
        })
    }

    const toggle = () => {
        return (
            <Switch defaultChecked onChange={(e) => { settype(!type) }} />
        )
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-12'><div className='row justify-content-center mt-5 mb-5'><h1 className='col-4 main_txt'>{stype}</h1><div className='col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12'>{searchbar()}</div></div></div>
                    <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 brand mb-5'>
                        <div className='row justify-content-center'>
                            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-6'>
                                <h3 className='filter'>Research Area</h3>
                                <Checkbox areas={rareas}
                                    handleFilters={filters => handleFilters(filters, 'area')} />

                            </div>
                        </div>

                        <div className='row justify-content-center mt-5 mb-5'>
                            <Radio.Group className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-6'>
                                <h3 className='filter'>Alocated Groups</h3>
                                <Radiobox groups={groups}
                                    handleFilters={filters => handleFilters(filters, 'groups')} />
                            </Radio.Group>
                        </div>

                    </div>
                    <div className='col-xl-8 col-lg-8 col-md-8 col-sm-10 col-12'>
                        <div className='row justify-content-center'>
                            {filterResults ? (filterResults.map((supervisor, i) => (
                                <div key={i} className='col-xl-4 col-lg-5 col-md-6 col-sm-8 col-8 mb-4'>
                                    <Card1 supervisor={supervisor} type={isSupervisor} group={dgroup ? dgroup : ""} />
                                </div>

                            ))) : ''}

                        </div>
                    </div>
                </div>
                {loadmorebutton()}
            </div>
        </>
    );
}

export default RequestSupervisor;