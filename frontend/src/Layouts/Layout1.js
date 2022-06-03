import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, WechatOutlined, TeamOutlined, UserOutlined, FilePdfOutlined, HomeOutlined, QuestionOutlined, } from '@ant-design/icons';
import '../Assets/Styles/Layout1.css'
import NavBar_DashBoard from '../Components/Home/NavBar_DashBoard';
import { Link, useLocation } from 'react-router-dom'
import Navbar_staff from '../Components/Home/Navbar_staff';
import NavBar_Admin from '../Components/Home/NavBar_Admin';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;





function Layout1(props) {
    const location = useLocation();
    const [page, setpage] = useState('');
    const onCollapse = () => {
        setcollapsed(!collapsed)
    }

    const [collapsed, setcollapsed] = useState(true)

    let staffId = localStorage.getItem("staff");
    console.log(localStorage.getItem("staff"));


    const slider = () => (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: "#0157a8" }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline" style={{ backgroundColor: "#0157a8" }}>


                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to='/home'>Home</Link>
                </Menu.Item>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Supervisors">
                    <Menu.Item key="2"><Link to='/req' className='links'>Supervisor</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="4" icon={<FilePdfOutlined />}>
                    <Link to='/AllSubmission' >Submissions</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<TeamOutlined />}>
                    <Link to='/group' className='links'> Group</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<WechatOutlined />}>
                    <Link to='/msg' className='links'> Chat</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<QuestionOutlined />}>
                    <Link to='/help' className='links'> Help</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )



    const slider2 = () => (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: "rgb(231, 55, 55)" }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline" style={{ backgroundColor: "rgb(231, 55, 55)" }}>

                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to='/home'>Home</Link>

                </Menu.Item>
       
        
                <SubMenu key="sub2" icon={<PieChartOutlined />} title="Groups">
                    <Link to='/panels/view/all' className='links'>
                        <Menu.Item key="2">All Groups</Menu.Item>
                    </Link>
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="Panels">
                    <Link to={`/panels/view/users/${staffId}`} className='links'>
                        <Menu.Item key="3">My Panels</Menu.Item>
                    </Link>
                </SubMenu>
                <SubMenu key="sub4" icon={<UserOutlined />} title="Supervisors">
                    <Menu.Item key="4"><Link to='/req' className='links'>Supervisor</Link></Menu.Item>
                    <Menu.Item key="5"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<FilePdfOutlined />} title="Documentation">
                    <Menu.Item key="6"><Link to='/CreateSubmission' className='links'>Created Submission</Link></Menu.Item>
                    <Menu.Item key="7"><Link to='/panels/submissions/all' className='links'>All Submissions</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="8" icon={<TeamOutlined />}>
                    <Link to='/allocatedgroups' className='links'> Group</Link>
                </Menu.Item>
                <Menu.Item key="9" icon={<WechatOutlined />}>
                    <Link to='/msg' className='links'> Chat</Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<QuestionOutlined />}>
                    <Link to='/help' className='links'> Help</Link>
                </Menu.Item>
               
            </Menu>
        </Sider>
    )


    const slider3 = () => (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: "#9932CC" }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline" style={{ backgroundColor: "#9932CC" }}>

                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to='/home'>Home</Link>
                </Menu.Item>
               
                <SubMenu key="sub1" icon={<PieChartOutlined />} title="Panels">
                    <Link to='/panel/add' className='links'><Menu.Item key="2">Create Panel</Menu.Item></Link>
                    <Link to='/panels/' className='links'><Menu.Item key="3">All Panels</Menu.Item></Link>
                    <Link to='/panels/add' className='links'><Menu.Item key="4">Add Panel</Menu.Item></Link>
                </SubMenu>
                <SubMenu key="sub2" icon={<PieChartOutlined />} title="Marking Schemes">
                    <Link to='/markingscheme/add' className='links'><Menu.Item key="5">Create Marking Scheme</Menu.Item></Link>
                    <Link to='/markingscheme/' className='links'><Menu.Item key="6">All Marking Schemes</Menu.Item> </Link>
                </SubMenu>

                <SubMenu key="sub4" icon={<UserOutlined />} title="Supervisors">
                    <Menu.Item key="7"><Link to='/req' className='links'>Supervisor</Link></Menu.Item>
                    <Menu.Item key="8"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FilePdfOutlined />}>
                    <Link to='/CreateSubmission' className='links'>Create Submission</Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<TeamOutlined />}>
                    <Link to='/grouplist' className='links'> Group</Link>
                </Menu.Item>
             
                <SubMenu key="sub4" icon={<TeamOutlined />} title="Users">
                    <Menu.Item key="11"><Link to='/allusers' className='links'>All Students</Link></Menu.Item>
                    <Menu.Item key="12"><Link to='/allsupervisors' className='links'>Staff</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="13" icon={<WechatOutlined />}>
                    <Link to='/questions' className='links'> Questions</Link>
                </Menu.Item>

            </Menu>
        </Sider>
    )


    const breadcrumb = () => (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
    )

    const footer = () => (
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    )

    return (
        <>
            {localStorage.getItem("user") ? <>
                <NavBar_DashBoard />
                <Layout style={{ minHeight: 'calc(100vh - 3.37rem) ', backgroundColor: "green" }} className={(location.pathname === '/') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') ? "block" : ""}>

                    {slider()}
                    <Layout className="site-layout" >
                        {/* {breadcrumb()} */}
                        {props.children}
                    </Layout>
                </Layout>
            </> : <></>}

            {localStorage.getItem("staff") ? <>
                <Navbar_staff />
                <Layout style={{ minHeight: 'calc(100vh - 3.37rem) ' }} className={(location.pathname === '/') || (location.pathname === '/adminlogin') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') ? "block" : ""}>

                    {slider2()}
                    <Layout className="site-layout">
                        {/* {breadcrumb()} */}
                        {props.children}

                    </Layout>
                </Layout>
            </> : <></>}



            {localStorage.getItem("admin-token") ? <>


                <NavBar_Admin />
                <Layout style={{ minHeight: 'calc(100vh - 3.37rem) ' }} className={(location.pathname === '/') || (location.pathname === '/adminlogin') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') ? "block" : ""}>

                    {slider3()}
                    <Layout className="site-layout">

                        {/* {breadcrumb()} */}

                        {props.children}

                    </Layout>
                </Layout>
            </> : <></>}



        </>

    );
}

export default Layout1;