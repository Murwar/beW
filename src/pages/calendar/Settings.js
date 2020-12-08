import React, { ReactNode, SyntheticEvent } from "react";
import ApiCalendar from "./ApiCalendar.js";
import moment from "moment";
import "./Settings.css";
import { DATA } from "./ApiCalendar.js";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event: SyntheticEvent<any>, name: string): void {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  }

  render(): ReactNode {
    return (
      <div className="main-block">
        <div className="large-title">Настройки</div>
        <hr class="separator" />
        <div className="small-title">Календари</div>
        <div className="but-list">
          Авторизация в Calendar
          <button class="B-sign" onClick={(e) => this.handleItemClick(e, "sign-in")}>
            <img
              width="15px"
              alt="Google login"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            oogle Sign In
          </button>
          <button onClick={(e) => this.handleItemClick(e, "sign-out")}>
            Sign out
          </button>
        </div>
        <hr class="separator" />
      </div>
    );
  }
}
