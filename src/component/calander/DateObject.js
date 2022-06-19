import { propTypes } from "react-bootstrap/esm/Image";

const DateObject = ({
    isOff,
    isHoliday,
    isFullDayLeave,
    isHalfDayLeave,
    date,
    addHoliday,
    addLeave
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

    if(isHalfDayLeave){
        
        _class = "bg-secondary"
        _dText = isHalfDayLeave;
    }

    if (isOff) {
        _class = "bg-danger"
        _dText = "Off";
    }

    if(isFullDayLeave){
        _class = "bg-danger"
        _dText = isFullDayLeave;
    }

    if (isHoliday) {
        _class = "bg-warning";
        _dText = isHoliday;
    }

    

    _class = currentDateClass ? currentDateClass : _class;

    const addHolidayHandler = () => {
        addHoliday(date);
    }

    const addLeaveHandler = () => {
        addLeave(date);
    }

    return <>
        <td className={_class}>
            <p>{date}</p>
            <p>{_dText}</p>
            <button type="button" className={_btnClass} onClick={addHolidayHandler}>Holiday</button><button type="button" className={_btnClass} onClick={addLeaveHandler}>Leave</button>
        </td>
    </>

}

export default DateObject;