import React, {useState} from 'react'
import {ru} from 'date-fns/locale'
import {DatePickerCalendar} from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import './calendar.css'

function Calendar() {
    const [date, setDate] = useState(new Date())
    return (
        <div className={"calendar"}>
            <DatePickerCalendar weekdayFormat={"EEEEEE"} date={date} onDateChange={setDate} locale={ru}/>
        </div>
    )
}

export default Calendar;