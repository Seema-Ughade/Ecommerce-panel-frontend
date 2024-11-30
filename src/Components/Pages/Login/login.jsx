import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // Authenticate user
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', values);
      const { token, user } = response.data;

      // Store token
      localStorage.setItem('authToken', token);

      // Pass user data to onLogin prop
      onLogin(user);

      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-80">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Welcome to <span className="text-purple-600">Ecommerce Admin Panel || Arrc Technology</span>
        </h1>

        <Form onFinish={handleLogin} layout="vertical" className="mt-8 space-y-6">
          <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Enter Email Address" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}   className="w-full bg-purple-600"
          >
            Login
          </Button>
        </Form>
        <div className="text-sm mt-4 text-center">
          <Link to="/forgetpassword" className="font-medium text-purple-600 hover:text-gray-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
