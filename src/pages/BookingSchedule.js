import React, { Component, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import ApiCalendar from "./ApiCalendar.js";
import "./Spoiler.css";
import "./Calendar.css";
import { SingleDatePicker, DayPickerSingleDateController } from "react-dates";

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

class BookingSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      availiableApartList: [],
      bookedApartList: [],
    };
  }

  getEvents(date) {
    let that = this;
    ApiCalendar.listDayEvents(date, 100).then(({ result }: any) => {
      let respAvailiableApartList = [];
      let respBookedApartList = [];
      let events = result.items;
      let eventsList = events.map(function (event) {
        if (event.location == "availiable") {
          respAvailiableApartList.push(event);
        }
        if (event.location == "booked") {
          respBookedApartList.push(event);
        }
        that.setState({
          bookedApartList: respBookedApartList,
          availiableApartList: respAvailiableApartList,
        });
      });
    });
    that.setState({
      bookedApartList: [],
      availiableApartList: [],
    });
  }
  render() {
    var { date, bookedApartList, availiableApartList } = this.state;

    let availiableApartEvents = availiableApartList.map(function (event) {
      return (
        <div className="links">
          <a
            href={event.htmlLink}
            target="_blank"
            key={event.id}
            className="link"
          >
            {event.summary} <span className="badge"></span>
          </a>
        </div>
      );
    });

    let bookedApartEvents = bookedApartList.map(function (event) {
      return (
        <div className="link">
          <i class="qtip tip-top" data-tip={event.description}>
            {event.summary}
          </i>
        </div>
      );
    });

    return (
      <div className="arrival_schedule">
        <div className="calendarr">
          <DayPickerSingleDateController
            {...defaultProps}
            date={this.state.date} // momentPropTypes.momentObj or null  {events.length > 0 && eventsList}
            onDateChange={this.handleChange} // PropTypes.func.isRequired  {otiezdEvents.length > 0 && OteventsList}
            focused={this.state.focused} // PropTypes.bool   <h1>{this.state.otiezdStr}</h1>
            onFocusChange={({ focused }) => this.setState({ focused })}
            renderCalendarInfo={() => (
              <div>
                <div className="spoilb">
                  <div className="spoil">
                    <details>
                      <summary>
                        Свободно: {this.state.availiableApartList.length}
                      </summary>
                      <div className="spoil-inside">
                        {availiableApartList.length > 0 &&
                          availiableApartEvents}
                      </div>
                    </details>

                    <details>
                      <summary>
                        Забронировано: {this.state.bookedApartList.length}
                      </summary>
                      <div className="spoil-inside">
                        {bookedApartList.length > 0 && bookedApartEvents}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )} // PropTypes.func.isRequired
            id="your_unique_id"
            enableOutsideDays
          />
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

export default BookingSchedule;
