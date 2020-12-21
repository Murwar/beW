import ApiCalendar from "../calendar/ApiCalendar";

export default () => {
    var date = new Date();
    var start = new Date(date.getFullYear(), date.getMonth(), 0);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, -1);
    console.log(start);
    var loop = new Date(start);
    var nnn = 0;
    while (loop <= end) {
        nnn = nnn + 1
        var newDate = loop.setDate(loop.getDate() + 1);
        ApiCalendar.listBookedEvents(nnn, new Date(newDate), 50)
        ApiCalendar.listProblemEvents(nnn, new Date(newDate), 50)
        loop = new Date(newDate);
    }
}