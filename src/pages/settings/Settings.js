import React from "react";
import "./Settings.css";
import ApiCalendar from "../calendar/ApiCalendar";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            selectedHotel: null
        }
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === "sign-in") {
            ApiCalendar.handleAuthClick();
        } else if (name === "sign-out") {
            ApiCalendar.handleSignoutClick();
        }
    }

    handleChange = (event) => {
        this.setState({selectedHotel: event.target.value});
        localStorage.setItem("selectedHotel", event.target.value);
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotels/')
            .then(res => res.json())
            .then(result => {
                    this.setState({
                        hotels: result.hotels
                    })
                },
                error => {
                    this.setState({
                        error
                    })
                }
            )
        let selected = localStorage.getItem("selectedHotel");
        this.setState({selectedHotel: selected});
    }

    componentDidUpdate() {

    }

    render(): ReactNode {

        return (
            <div className="main-block">
                <div className="large-title">Настройки</div>
                <hr className="separator"/>
                <div className="small-title">Выбор гостиницы</div>
                <select className={"select-hotels"} value={this.state.selectedHotel} onChange={this.handleChange}>
                    {this.state.hotels.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                </select>
                <hr class="separator"/>
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
                <hr className="separator"/>
            </div>
        );
    }
}
