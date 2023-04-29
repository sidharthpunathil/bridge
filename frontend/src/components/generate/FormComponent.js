import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const FormComponent  = () => {
  const onFinish = (values) => {
    fetch('http://127.0.0.1:8000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='p-8 '>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Host One"
        name="hostone"
        rules={[{ required: true, message: 'Please input host one!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Host Two"
        name="hosttwo"
        rules={[{ required: true, message: 'Please input host two!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role One"
        name="roleone"
        rules={[{ required: true, message: 'Please input role one!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role Two"
        name="roletwo"
        rules={[{ required: true, message: 'Please input role two!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="link" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default FormComponent;
