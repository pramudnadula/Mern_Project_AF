import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, WechatOutlined, TeamOutlined, UserOutlined, FilePdfOutlined, } from '@ant-design/icons';
import '../Assets/Styles/Layout1.css'
import NavBar_DashBoard from '../Components/Home/NavBar_DashBoard';
import { Link, useLocation } from 'react-router-dom'
import Navbar_staff from '../Components/Home/Navbar_staff';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;





function Layout1(props) {
    const location = useLocation();
    const [page, setpage] = useState('');
    const onCollapse = () => {
        setcollapsed(!collapsed)
    }

    const [collapsed, setcollapsed] = useState(true)


    const slider = () => (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: "#0157a8" }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline" style={{ backgroundColor: "#0157a8" }}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Supervisors">
                    <Menu.Item key="6"><Link to='/req' className='links'>Supervisor</Link></Menu.Item>
                    <Menu.Item key="7"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<FilePdfOutlined />} title="Documentation">
                    <Menu.Item key="8"><Link to='/AllSubmission' className='links'>Submissions</Link></Menu.Item>
                    <Menu.Item key="9"><Link to='/UploadDocument' className='links'>Document</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="10" icon={<TeamOutlined />}>
                    <Link to='/group' className='links'> Group</Link>
                </Menu.Item>
                <Menu.Item key="11" icon={<WechatOutlined />}>
                    <Link to='/msg' className='links'> Chat</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )



    const slider2 = () => (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: "rgb(231, 55, 55)" }}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline" style={{ backgroundColor: "rgb(231, 55, 55)" }}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Supervisors">
                    <Menu.Item key="6"><Link to='/req' className='links'>Supervisor</Link></Menu.Item>
                    <Menu.Item key="7"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<FilePdfOutlined />} title="Documentation">
                    <Menu.Item key="8"><Link to='/CreateSubmission' className='links'>Create Submission</Link></Menu.Item>
                    <Menu.Item key="9"><Link to='/UploadDocument' className='links'>Document</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="10" icon={<TeamOutlined />}>
                    <Link to='/allocatedgroups' className='links'> Group</Link>
                </Menu.Item>
                <Menu.Item key="11" icon={<WechatOutlined />}>
                    <Link to='/msg' className='links'> Chat</Link>
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
            </> : <>
                <Navbar_staff />
                <Layout style={{ minHeight: 'calc(100vh - 3.37rem) ' }} className={(location.pathname === '/') || (location.pathname === '/adminlogin') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') ? "block" : ""}>

                    {slider2()}
                    <Layout className="site-layout">


                        {/* {breadcrumb()} */}

                        {props.children}



                    </Layout>
                </Layout>
            </>}

        </>

    );
}

export default Layout1;