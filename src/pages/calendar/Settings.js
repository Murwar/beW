import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from './ApiCalendar.js';
import moment from "moment";

const eventFromNow: object = {
    summary: "Poc Dev From Now",
    time: 480,
};

export default class Settings extends React.Component {


    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            bookcount: 0
        };
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();


        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        } else if (name === 'show') {
            var daysOfYear = [];
            var k = 0;

            for (var d = new Date(); d <= new Date().setDate(new Date().getDate() + 7); d.setDate(d.getDate() + 1)) {
                console.log(d);


                console.log("-------------------");
                ApiCalendar.listDayEvents(d, 100).then(({result}: any) => {
                    k = k + 1
                    var b = 0
                    console.log(result.items);
                    let events = result.items;
                    let eventsList = events.map(function (event) {

                        if (event.location == "booked") {
                            b = b + 1

                        }
                    });

                    console.log(b);
                    console.log(k);


                });

            }
            console.log(daysOfYear);
        } else if (name === 'new') {
            ApiCalendar.createEventFromNow(eventFromNow)
                .then((result: object) => {
                    console.log(result);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }

    render(): ReactNode {

        return (
            <div>
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-in')}
                >
                    sign-in
                </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'sign-out')}
                >
                    sign-out
                </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'new')}
                >
                    new
                </button>
                <button
                    onClick={(e) => this.handleItemClick(e, 'show')}
                >
                    show
                </button>
            </div>
        );
    }
}
