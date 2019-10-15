import React from "react"
import { Typography } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.css'

const { Title } = Typography;

const Login = function ({form}) {
    const { getFieldDecorator } = form;
    
    function handleSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // if(res) {
                //     // guardamos el token en localstorage
                //     // cambiamos la ubicacion del usuario -> /home
                // } else {
                //     // mostrar mensaje de error
                // }
            }
        });
    }

    return(
        <div className="container">
        <Title>Iniciar sesión</Title>
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Introduce un correo', type: 'email', }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!', min: 6 }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar sesión
            </Button>
            </Form.Item>
        </Form>
    </div>
    )
}

const WrappedLoginForm = Form.create({ name: 'login' })(Login);
export default WrappedLoginForm