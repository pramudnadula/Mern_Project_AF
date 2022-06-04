import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GET, POST } from '../../Helper/httpHelper';
import Comments from './Comments';
const { Option } = Select;

function QuestionForum(props) {
    const uid = localStorage.getItem("user")
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false);
    const [questions, setquestions] = useState([]);

    useEffect(() => {

        GET('api/question/all').then((data) => {
            setquestions(data)

        }).catch((err) => {
            console.log(err)
        })

    }, [questions])


    const showDrawer = () => {
        setVisible(true);
    };
    const finish = async (values) => {
        const ob = {
            uid,
            question: values.question,
            replys: []
        }
        try {
            const d = await POST('api/question/create', ob)
            if (d.msg) {
                message.success("Question added Successfully")
                setVisible(false);
            }
        } catch (error) {
            console.log(error)
        }



    }

    const onClose = () => {


        setVisible(false);
    };
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-10'>
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Add Question
                    </Button>

                    {questions?.map((m, i) => (
                        <Comments key={i} ob={m}>

                        </Comments>
                    ))}



                    <Drawer
                        title="Add a new Question"
                        width={720}
                        onClose={onClose}
                        visible={visible}
                        bodyStyle={{
                            paddingBottom: 80,
                        }}
                        extra={
                            <Space>
                                <Button onClick={onClose}>Cancel</Button>

                            </Space>
                        }
                    >
                        <Form layout="vertical" hideRequiredMark onFinish={finish} form={form}>


                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="question"
                                        label=" Question"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please enter the question',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={7} placeholder="please enter the question" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    </Drawer>
                </div>
            </div>

        </div>
    );
}

export default QuestionForum;