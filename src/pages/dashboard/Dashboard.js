import React, {Component} from 'react';
import Calendar from "./Calendar";

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <Calendar/>
            </div>
        );
    }
}

export default Dashboard;