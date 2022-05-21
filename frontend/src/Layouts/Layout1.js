import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, WechatOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import '../Assets/Styles/Layout1.css'
import NavBar_DashBoard from '../Components/Home/NavBar_DashBoard';
import { Link, useLocation } from 'react-router-dom'

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
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={page} mode="inline">
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
                    <Menu.Item key="8"><Link to='/creq' className='links'>Co-supervisor</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<TeamOutlined />}>
                    <Link to='/group' className='links'> Group</Link>
                </Menu.Item>
                <Menu.Item key="10" icon={<WechatOutlined />}>
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
            <NavBar_DashBoard />
            <Layout style={{ minHeight: '93vh' }} className={location.pathname === '/' ? "block" : ""}>

                {slider()}
                <Layout className="site-layout">


                    {/* {breadcrumb()} */}

                    {props.children}



                </Layout>
            </Layout>
        </>

    );
}

export default Layout1;