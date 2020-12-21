import React from 'react';
import store from 'store';
import ApiCalendar from "../calendar/ApiCalendar";


const handleLogout = history => () => {
    store.remove('loggedIn');
    ApiCalendar.handleSignoutClick();
    history.push('/login');
};

const Logout = ({history}) => {
    handleLogout(history);
}


export default Logout;