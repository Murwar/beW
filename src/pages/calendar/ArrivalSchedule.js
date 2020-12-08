import React, {Component, useState} from "react";
import moment from "moment";
import "moment/locale/ru";
import DatePicker from "./DatePicker";
import "./Spoiler.css";
import "./tooltip.css";
import "./Calendar.css";
import ApiCalendar from "./ApiCalendar.js";
import {SingleDatePicker, DayPickerSingleDateController} from "react-dates";

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: null,
    showInput: false,
    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    isDayBlocked: () => false,
    isDayHighlighted: () => false,
    enableOutsideDays: false,
    hideKeyboardShortcutsPanel: true,
    // calendar presentation and interaction related props
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 3,
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
    // navigation related props
    navPrev: null,
    navNext: null,
    renderNavPrevButton: null,
    renderNavNextButton: null,
    // internationalization
    monthFormat: "MMMM YYYY",
};

class ArrivalSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            checkinApartList: [],
            checkoutApartList: [],
            occupiedApartList: [],
            brokenApartList: [],
            dirtyApartList: [],
        };
    }

    getEvents(date) {
        let that = this;
        ApiCalendar.listDayEvents(date, 100).then(({result}: any) => {
            let respCheckinApartList = [];
            let respCheckoutApartList = [];
            let respOccupiedApartList = [];
            let respBrokenApartList = [];
            let respDirtyApartList = [];
            let events = result.items;
            let eventsList = events.map(function (event) {
                if (event.location === "booked") {
                    if (
                        event.start.date === moment(that.state.date).format("YYYY-MM-DD")
                    ) {
                        respCheckinApartList.push(event);
                    }
                }
                if (event.location === "occuped") {
                    if (
                        event.end.date ===
                        moment(that.state.date).add(1, "days").format("YYYY-MM-DD")
                    ) {
                        respCheckoutApartList.push(event);
                    }
                }
                if (event.location === "dirty") {
                    respDirtyApartList.push(event);
                }
                if (event.location === "broken") {
                    respBrokenApartList.push(event);
                }
                that.setState({
                    checkinApartList: respCheckinApartList,
                    checkoutApartList: respCheckoutApartList,
                    dirtyApartList: respDirtyApartList,
                    brokenApartList: respBrokenApartList,
                });
            });
        });
        that.setState({
            checkinApartList: [],
            checkoutApartList: [],
            dirtyApartList: [],
            brokenApartList: [],
        });
    }

    render() {
        var {
            date,
            checkinApartList,
            checkoutApartList,
            occupiedApartList,
            brokenApartList,
            dirtyApartList,
        } = this.state;
        let dirtyApartEvents = dirtyApartList.map(function (event) {
            return (
                <div className="link">
                    <i class="qtip tip-top" data-tip={event.description}>
                        {event.summary}
                    </i>
                </div>
            );
        });
        let brokenApartEvents = brokenApartList.map(function (event) {
            return (
                <div className="link">
                    <i class="qtip tip-top" data-tip={event.description}>
                        {event.summary}
                    </i>
                </div>
            );
        });
        let checkinApartEvents = checkinApartList.map(function (event) {
            return (
                <div className="link">
                    <i class="qtip tip-top" data-tip={event.description}>
                        {event.summary}
                    </i>
                </div>
            );
        });

        let checkoutApartEvents = checkoutApartList.map(function (event) {
            return (
                <div className="link">
                    <i class="qtip tip-top" data-tip={event.description}>
                        {event.summary}
                    </i>
                </div>
            );
        });

        let emptyState = (
            <div className="empty">
                <h3>
                    No meetings are scheduled for the day. Create one by clicking the
                    button below.
                </h3>
            </div>
        );

        return (
          <div className="main-block">
            <div className="large-title">Календарь заездов</div>
            <hr class="separator" />
            <div className="arrival_schedule">
                <div className="calendarr">
                    <DayPickerSingleDateController
                        {...defaultProps}
                        date={this.state.date} // momentPropTypes.momentObj or null  {events.length > 0 && eventsList}
                        onDateChange={this.handleChange} // PropTypes.func.isRequired  {otiezdEvents.length > 0 && OteventsList}
                        focused={this.state.focused} // PropTypes.bool   <h1>{this.state.otiezdStr}</h1>
                        onFocusChange={({focused}) => this.setState({focused})}
                        renderCalendarInfo={() => (
                            <div>
                                <div className="spoilb">
                                    <div className="spoil">
                                        <details>
                                            <summary>
                                                Отъезды: {this.state.checkoutApartList.length}
                                            </summary>
                                            <div className="detblock">
                                                <div className="spoil-inside">
                                                    {checkoutApartList.length > 0 && checkoutApartEvents}
                                                </div>
                                            </div>
                                        </details>

                                        <details>
                                            <summary>
                                                Заезды: {this.state.checkinApartList.length}
                                            </summary>

                                            <div className="spoil-inside">
                                                {checkinApartList.length > 0 && checkinApartEvents}
                                            </div>

                                        </details>
                                    </div>
                                    <div className="spoil">
                                        <details>
                                            <summary>
                                                Неубранные номера: {this.state.dirtyApartList.length}
                                            </summary>
                                            <div className="detblock">
                                                <div className="spoil-inside">
                                                    {dirtyApartList.length > 0 && dirtyApartEvents}
                                                </div>
                                            </div>
                                        </details>

                                        <details>
                                            <summary>
                                                Проблемные номера: {this.state.brokenApartList.length}
                                            </summary>
                                            <div className="detblock">
                                                <div className="spoil-inside">
                                                    {brokenApartList.length > 0 && brokenApartEvents}
                                                </div>
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        )}
                        id="your_unique_id"
                        enableOutsideDays
                    />
                </div>
                </div>
            </div>
        );
    }

    handleChange = (date) => {
        this.setState({
            date,
        });
        this.getEvents(date);
    };
}

export default ArrivalSchedule;
