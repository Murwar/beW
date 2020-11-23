import React, {useState, useEffect} from 'react';
import './Login.css';
import desktopImage from '../../resources/images/login_b.png';
import mobileImage from '../../resources/images/login_s.png';
import label from '../../resources/images/label.png';
import {Button, Form, Input} from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import {Redirect} from "react-router";
import store from 'store';
import isLoggedIn from "./is_logged_in";

const Login = (props) => {
    store.set('loggedIn', false);
    const login = 'test';
    const password = 'test';
    const {history} = props;
    const [passValid, setPasswordValid] = useState(false);
    const [logValid, setLoginValid] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswordValid(password === e.target.value);
    };

    const handleUserInput = (e) => {
        setLoginValid(login === e.target.value);
    };

    const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passValid && logValid) {
            alert('Успешый вход!');
            store.set('loggedIn', true);
            history.push('/');
        } else if (!passValid || !logValid) {
            alert('Wrong password or login!');
        }
    };

    if (isLoggedIn()) {
        return <Redirect to="/"/>;
    }
    return (
        <div>
            <div className="login" style={{backgroundImage: `url(${imageUrl})`}}>
                <div className="login-content">
                    <Card>
                        <img src={label} className={'label'} alt={"WHO ARE YOU?"}/>
                        <Form>
                            <Input id={"input"} type="text" placeholder="ЛОГИН" onChange={handleUserInput}/>
                            <Input id={"input"} type="password" placeholder="ПАРОЛЬ"
                                   onChange={handlePasswordChange}/>
                            <Button className={'login_btn'} onClick={handleSubmit}>LOGIN</Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

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