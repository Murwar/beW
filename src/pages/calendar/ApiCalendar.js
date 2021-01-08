import moment from "moment";

const Config = require("./apiGoogleconfig.json");

export const PROBLEMDATA = [[
    {
        x: 'Nov 9, 2020',
        y: 9999
    }
]];
export const DATA = [[
    {
        x: 'Nov 9, 2020',
        y: 10000
    }
]];

class ApiCalendar {
    constructor() {
        this.sign = false;
        this.gapi = null;
        this.onLoadCallback = null;
        this.calendar = 'primary';
        try {
            this.updateSigninStatus = this.updateSigninStatus.bind(this);
            this.initClient = this.initClient.bind(this);
            this.handleSignoutClick = this.handleSignoutClick.bind(this);
            this.handleAuthClick = this.handleAuthClick.bind(this);
            this.createEvent = this.createEvent.bind(this);
            this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
            this.createEventFromNow = this.createEventFromNow.bind(this);
            this.listenSign = this.listenSign.bind(this);
            this.onLoad = this.onLoad.bind(this);
            this.setCalendar = this.setCalendar.bind(this);
            this.handleClientLoad();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Update connection status.
     */
    updateSigninStatus(isSignedIn) {
        this.sign = isSignedIn;
    }

    /**
     * Auth to the google Api.
     */
    initClient() {
        this.gapi = window['gapi'];
        this.gapi.client.init(Config)
            .then(() => {
                // Listen for sign-in state changes.
                this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
                // Handle the initial sign-in state.
                this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
                if (this.onLoadCallback) {
                    this.onLoadCallback();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    /**
     * Init Google Api
     * And create gapi in global
     */
    handleClientLoad() {
        this.gapi = window['gapi'];
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);
        script.onload = () => {
            window['gapi'].load('client:auth2', this.initClient);
        };
    }

    /**
     * Sign in Google user account
     */
    handleAuthClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signIn();
        } else {
            console.log("Error: this.gapi not loaded");
        }
    }

    /**
     * Set the default attribute calendar
     */
    setCalendar(newCalendar) {
        this.calendar = newCalendar;
    }

    /**
     * Execute the callback function when a user is disconnected or connected with the sign status.
     */
    listenSign(callback) {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        } else {
            console.log("Error: this.gapi not loaded");
        }
    }

    /**
     * Execute the callback function when gapi is loaded
     */
    onLoad(callback) {
        if (this.gapi) {
            callback();
        } else {
            this.onLoadCallback = callback;
        }
    }

    /**
     * Sign out user google account
     */
    handleSignoutClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
        } else {
            console.log("Error: this.gapi not loaded");
        }
    }

    listMonthEvents(date, maxResults, calendarId = this.calendar) {

        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': calendarId,
                'timeMin': moment(date).startOf("month").toISOString(),
                'timeMax': moment(date).endOf("month").toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'orderBy': 'startTime'
            });
        } else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }

    listDayEvents(date, maxResults) {

        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': "449jtc5acfnd0ohkrlpncsiubk@group.calendar.google.com",
                'timeMin': moment(date).startOf("day").toISOString(),
                'timeMax': moment(date).endOf("day").toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'orderBy': 'startTime',
            });
        } else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }


    listProblemEvents(num, date, maxResults) {

      var dateEnd = new Date(Date.UTC(date.getFullYear()
                           ,date.getMonth()
                           ,date.getDate()-1
                           ,23,59,59)).toISOString();
      var dateStart = new Date(Date.UTC(date.getFullYear()
                                                ,date.getMonth()
                                                ,date.getDate()-1
                                                ,0,0,0)).toISOString();
        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': "449jtc5acfnd0ohkrlpncsiubk@group.calendar.google.com",
                'timeMin': dateStart,
                'timeMax': dateEnd,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'q': 'broken'
            }).then(({result}: any) => {
              var b = 0;
              var events = result.items;
              let eventsList = events.map(function (event) {
                console.log(moment(event.end.date).toLocaleString('en-US',options),moment(date).toLocaleString('en-US',options));
             if (moment(event.end.date).toLocaleString('en-US',options) !== moment(date).toLocaleString('en-US',options)) {

                      if (
                          event.start.date === moment(dateStart).format("YYYY-MM-DD")
                      ) {
                          b = b + 1
                      }
                      console.log("Error: this.gapi not loaded");
                      console.log(moment(event.end.date).toLocaleString('en-US',options),moment(date).toLocaleString('en-US',options));
                  }
              });
                var options = { year: 'numeric', month: 'short', day: 'numeric' };
console.log(date,b);
  PROBLEMDATA[0][num-1] =  {x: new Date(date.getFullYear(), date.getMonth(), num).toLocaleString('en-US',options), y: b};
            });
            return true;
        } else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }

    listBookedEvents(num, date, maxResults) {

        var dateEnd = new Date(Date.UTC(date.getFullYear()
            , date.getMonth()
            , date.getDate() - 1
            , 23, 59, 59)).toISOString();
        var dateStart = new Date(Date.UTC(date.getFullYear()
            , date.getMonth()
            , date.getDate() - 1
            , 0, 0, 0)).toISOString();
        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': "449jtc5acfnd0ohkrlpncsiubk@group.calendar.google.com",
                'timeMin': dateStart,
                'timeMax': dateEnd,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'q': 'booked'
            }).then(({result}: any) => {
                var b = 0;
                var events = result.items;
                let eventsList = events.map(function (event) {
                    console.log(moment(event.end.date).toLocaleString('en-US', options), moment(date).toLocaleString('en-US', options));
                    if (moment(event.end.date).toLocaleString('en-US', options) !== moment(date).toLocaleString('en-US', options)) {
                        b = b + 1
                        console.log("Error: this.gapi not loaded");
                        console.log(moment(event.end.date).toLocaleString('en-US', options), moment(date).toLocaleString('en-US', options));
                    }
                });
                var options = {year: 'numeric', month: 'short', day: 'numeric'};
                console.log(date, b);
                DATA[0][num - 1] = {
                    x: new Date(date.getFullYear(), date.getMonth(), num).toLocaleString('en-US', options),
                    y: b
                };
            });
            return true;
        } else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }
}

let apiCalendar;
try {
    apiCalendar = new ApiCalendar();
} catch (e) {
    console.log(e);
}
export default apiCalendar;
