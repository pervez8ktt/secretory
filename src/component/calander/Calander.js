import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useConfiguration from "../../data/useConfiguration";
import useHoliday from "../../data/useHoliday";
import useLeave from "../../data/useLeave";
import FormSelect from "../../UI/form/FormSelect";
import Holiday from "../holiday/Holiday";
import Leave from "../leave/Leave";
import DateObject from "./DateObject";

const Calander = (props) => {

    const configuration = props.configuration;
    const setTotalLeaves = props.setTotalLeaves;
    const setTotalHoliday = props.setTotalHoliday;

    const { getListByYearAndMonth } = useHoliday();
    const { getListByYearAndMonth: getLeaveListByYearAndMonth } = useLeave();

    const _currentDate = new Date();

    const _currentYear = _currentDate.getFullYear();
    const [month, setMonth] = useState(_currentDate.getMonth());
    const [year, setYear] = useState(_currentYear);
    const [date, setDate] = useState(_currentDate.getDate());
    //    const [totalWorking, setTotalworking] = useState(0);

    _currentDate.setDate(1)

    const [holidayList, setHolidayList] = useState();

    const [leaveList, setLeaveList] = useState();
    const [holidayTitle, setHolidayTitle] = useState('');

    const [dayRowsS, setDayRowsS] = useState([])

    useEffect(() => {
        updateHolidayHandler();
        updateLeaveHandler();
    }, [month, year])

    const addHolidayShowState = useState(false);

    const [, showHolidayModal] = addHolidayShowState;

    const addLeaveShowState = useState(false);

    const [, showLeaveModal] = addLeaveShowState;

    const addHoliday = ((_date) => {
        showHolidayModal(true);
        setDate(_date)

    })

    const addLeave = ((_date) => {
        showLeaveModal(true);
        setDate(_date)

    })

    useEffect(() => {
        var dayRows = []
        const currentDate = new Date(year,month,1);
        const day = currentDate.getDay();

        var _totalDays = 0;
        var _totalLeaves = 0;
        var _totalHoliday = 0;

        var d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInAMonth = d.getDate();

        var dt = 1;

        /*
            Immediately invoked function expression:
            
            (_functionDef)()
    
            Ques: https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
    
            Ans: https://stackoverflow.com/a/44320193
        
        */

        var dayRows = [<tr key={'tr-' + dt}>
            {(() => {
                let cols = [];

                for (let i = 0; i < 7; i++) {
                    if (i < day) {
                        cols.push(<td key={'b-' + i} ></td>);
                    } else {
                        const _obj = {
                            isOff: false,
                            isHoliday: false,
                            isFullDayLeave: false,
                            isHalfDayLeave: false,
                            isWorking: true,
                            date: dt,
                            addHoliday: addHoliday,
                            addLeave
                        }

                        isOff(i, dt, _obj);

                        if (_obj.isWorking) {
                            if (_obj.isHalfDayLeave) {
                                _totalDays += 0.5;
                                _totalLeaves += 0.5
                            } else {
                                _totalDays++;
                            }

                        } else {
                            if (_obj.isFullDayLeave) {
                                _totalLeaves += 1
                            } else if (_obj.isHoliday) {
                                _totalHoliday += 1;
                            }
                        }

                        cols.push(<DateObject key={i} {..._obj} />);
                        dt++
                    }

                }
                return cols;
            })()}
        </tr>];

        while (dt <= daysInAMonth) {
            let trComp = <tr key={'tr-' + dt}>
                {(() => {
                    let cols = [];

                    for (let i = 0; i < 7; i++) {
                        if (dt > daysInAMonth) {
                            cols.push(<td key={'e-' + i} ></td>);
                        } else {
                            const _obj = {
                                isOff: false,
                                isHoliday: false,
                                isFullDayLeave: false,
                                isHalfDayLeave: false,
                                addHoliday: addHoliday,
                                addLeave,
                                isWorking: true,
                                date: dt
                            }

                            isOff(i, dt, _obj);

                            if (_obj.isWorking) {
                                if (_obj.isHalfDayLeave) {
                                    _totalDays += 0.5;
                                    _totalLeaves += 0.5
                                } else {
                                    _totalDays++;
                                }

                            } else {
                                if (_obj.isFullDayLeave) {
                                    _totalLeaves += 1
                                } else if (_obj.isHoliday) {
                                    _totalHoliday += 1;
                                }
                            }

                            cols.push(<DateObject key={i} {..._obj} />);
                            dt++
                        }


                    }
                    return cols;
                })()}
            </tr>

            dayRows.push(trComp);

        }

        setDayRowsS(dayRows);
        props.setTotalworking(_totalDays);
        setTotalLeaves(_totalLeaves);
        setTotalHoliday(_totalHoliday)

    }, [configuration, holidayList, leaveList, year, month])


    const isOff = (_weekDay, dt, _obj) => {

        if (configuration == null) {
            return;
        }

        if (holidayList) {
            let _h = holidayList[dt]
            if (_h) {
                _obj.isHoliday = _h.title
                _obj.isWorking = false
            } else {
                _obj.isHoliday = false

            }
        }

        if (leaveList) {
            let _h = leaveList[dt]
            if (_h) {
                if (_h.leaveType === 'Full-day') {
                    _obj.isFullDayLeave = _h.title
                    _obj.isWorking = false
                } else if (_h.leaveType === 'Half-day') {
                    _obj.isHalfDayLeave = _h.title
                }

            }
        }

        const saturdayOff = configuration.saturdayOff;
        if (_weekDay === 0) {
            _obj.isOff = true;
            _obj.isWorking = false
            return
        } else {
            _obj.isOff = false;
        }

        if (_weekDay === 6) {

            const weekIndex = Math.ceil((dt - 1 - _weekDay) / 7)

            if (saturdayOff === 1) {
                _obj.isOff = true;
                _obj.isWorking = false
                return

            } else if (saturdayOff === 2) {
                if (weekIndex === 1 || weekIndex === 3) {
                    _obj.isOff = true;
                    _obj.isWorking = false
                    return
                } else {
                    _obj.isOff = false;
                    return
                }

            } else {
                _obj.isOff = false;
                return

            }

        }





    }

    const handleOnChange = (type, e) => {
        let value = e.target.value;
        if (type === 'year') {
            setYear(value);
        } else if (type === 'month') {
            setMonth(value);
        }
    }

    const yearOptions = [];

    for (var i = _currentYear; i > _currentYear - 70; i--) {
        let opt = <option key={i}>{i}</option>;
        yearOptions.push(opt);
    }



    const updateHolidayHandler = () => {
        getListByYearAndMonth({ year: year, month: month }, (_holidayList) => {
            setHolidayList(_holidayList);
        })
    }

    const updateLeaveHandler = () => {
        getLeaveListByYearAndMonth({ year: year, month: month }, (_leaveList) => {
            setLeaveList(_leaveList);
        })
    }

    return <>
        <Holiday addShowState={addHolidayShowState} date={date} month={month} year={year} updateHolidayHandler={updateHolidayHandler} />
        <Leave addShowState={addLeaveShowState} date={date} month={month} year={year} updateHolidayHandler={updateLeaveHandler} />
        <p className="px-md-2">Legends</p>
        <Row className="px-md-4">
            <Col md={2} className=" bg-danger d-flex justify-content-center align-items-center">
                <p >Full Day Leave</p>

            </Col>
            <Col md={2} className="px-md-2 bg-secondary d-flex justify-content-center align-items-center">
                <p >Half Day Leave</p>

            </Col>
            <Col md={2} className="px-md-2 bg-warning d-flex justify-content-center align-items-center">
                <p>Holiday</p>
            </Col>
        </Row>

        <Row className="px-md-4">
            <Col md={6}>
                <FormSelect label={"Month"} value={month} onChange={handleOnChange.bind(this, 'month')}>
                    <option key={0} value="0">January</option>
                    <option key={1} value="1">Fabruary</option>
                    <option key={2} value="2">March</option>
                    <option key={3} value="3">April</option>
                    <option key={4} value="4">May</option>
                    <option key={5} value="5">June</option>
                    <option key={6} value="6">July</option>
                    <option key={7} value="7">August</option>
                    <option key={8} value="8">September</option>
                    <option key={9} value="9">October</option>
                    <option key={10} value="10">November</option>
                    <option key={11} value="11">December</option>

                </FormSelect>
            </Col>
            <Col md={6}>
                <FormSelect label={"Year"} onChange={handleOnChange.bind(this, 'year')} value={year}>
                    {yearOptions}
                </FormSelect>

            </Col>
        </Row>
        <br />
        <Row>
            <Col>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sunday</th>
                            <th scope="col">Monday</th>
                            <th scope="col">Tuesday</th>
                            <th scope="col">Wednesday</th>
                            <th scope="col">Thrusday</th>
                            <th scope="col">Friday</th>
                            <th scope="col">Saturday</th>
                        </tr>
                    </thead>
                    <tbody>

                        {dayRowsS}

                    </tbody>
                </table>
            </Col>
            
        </Row>
    </>
}



export default Calander;