import React from 'react';
import store from 'store';


const handleLogout = history => () => {
    store.remove('loggedIn');
    history.push('/login');
};

const Logout = ({history}) => {
    handleLogout(history);
}


export default Logout;