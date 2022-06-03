import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { POST } from '../../Helper/httpHelper';
function ContactAdmin(props) {
    const [form] = Form.useForm()
    const uid = localStorage.getItem("user") || localStorage.getItem("staff")
    let type = "";
    if (localStorage.getItem("user")) {
        type = "us"
    }
    else {
        type = "st"
    }
    const onfinish = (values) => {
        const ob = {
            name: values.name,
            uid,
            email: values.email,
            subject: values.subject,
            question: values.question,
            utype: type
        }
        POST('api/admincontact/create', ob).then((data) => {
            form.resetFields()
            message.success("Message send Successfully")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (

        <div className='col-4 mt-5'>
            <Form layout='vertical' className='bs1 p-3' onFinish={onfinish} form={form}>
                <h3 className='text-center'>Contact Admin</h3>
                <Form.Item name='name' label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='email' label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='subject' label="Subject" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='question' label="Question" rules={[{ required: true }]}>
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default ContactAdmin;