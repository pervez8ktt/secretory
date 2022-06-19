import { propTypes } from "react-bootstrap/esm/Image";

const DateObject = ({
    isOff,
    isHoliday,
    isFullDayLeave,
    isHalfDayLeave,
    date,
    addHoliday
}) => {

    var _d = new Date();

    var _class = "";
    var _btnClass = "btn btn-link";

    var _dText = "";
    var currentDateClass;
    if (date === _d.getDate()) {
        currentDateClass = "bg-primary"
        _btnClass="btn btn-dark"

    }

    if (isOff) {
        _class = "bg-danger"
        _dText = "Off";
    }
    if (isHoliday) {
        _class = "bg-warning";
        _dText = isHoliday;
    }

    _class = currentDateClass ? currentDateClass : _class;

    const addHolidayHandler = () => {
        addHoliday(date);
    }

    return <>
        <td className={_class}>
            <p>{date}</p>
            <p>{_dText}</p>
            <button type="button" className={_btnClass} onClick={addHolidayHandler}>Holiday</button><button type="button" className={_btnClass}>Leave</button>
        </td>
    </>

}

export default DateObject;