import React, {useState, useEffect} from 'react';
import './Login.css';
import desktopImage from '../resources/images/login_b.png';
import mobileImage from '../resources/images/login_s.png';
import {Button, Form, Input} from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import label from '../resources/images/label.png';

const Login = () => {
    const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;

    return (
        <div className="login" style={{backgroundImage: `url(${imageUrl})`}}>
            <div className="login-content">
                <Card>
                    <img src={label} className={'label'} alt={"WHO ARE YOU?"}/>
                    <Form>
                        <Input id={"input"} type="text" placeholder="ЛОГИН"/>
                        <Input id={"input"} type="password" placeholder="ПАРОЛЬ"/>
                        <Button className={'login_btn'}>LOGIN</Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return windowWidth;
};

export default Login;