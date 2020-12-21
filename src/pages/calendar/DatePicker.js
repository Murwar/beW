import React, {useState} from "react";
import {SingleDatePicker} from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default function DatePicker({date, onChange}) {
    const [focused, setFocused] = useState(false);

    return (
        <SingleDatePicker
            numberOfMonths={window.innerWidth < 600 ? 1 : 2}
            onDateChange={changeDate => onChange({target: {value: changeDate}})}
            onFocusChange={({f}) => setFocused(f)}
            focused={focused}
            date={date}
            displayFormat="YYYY-MM-DD"
            isDayBlocked={m => m.day() === 6 || m.day() === 0}
            hideKeyboardShortcutsPanel
            // withPortal
            withFullScreenPortal={window.innerWidth < 400}
        />
    );
}
