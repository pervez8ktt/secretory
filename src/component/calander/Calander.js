import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useConfiguration from "../../data/useConfiguration";
import useHoliday from "../../data/useHoliday";
import FormSelect from "../../UI/form/FormSelect";
import Holiday from "../holiday/Holiday";
import DateObject from "./DateObject";

const Calander = (props) => {

    const configuration = props.configuration;

    const { getListByYearAndMonth, set } = useHoliday();

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentYear);
    const [date, setDate] = useState(currentDate.getDate());
    //    const [totalWorking, setTotalworking] = useState(0);

    currentDate.setDate(1)

    const [holidayList, setHolidayList] = useState();
    const [holidayTitle, setHolidayTitle] = useState('');

    const [dayRowsS, setDayRowsS] = useState([])

    useEffect(() => {
        updateHolidayHandler();
    }, [month, year])

    const addHolidayShowState = useState(false);

    const [, showHolidayModal] = addHolidayShowState;

    const addHoliday = ((_date) => {
        showHolidayModal(true);
        setDate(_date)

    })

    useEffect(() => {
        var dayRows = []
        const day = currentDate.getDay();

        var _totalDays = 0;

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
                            addHoliday: addHoliday
                        }

                        isOff(i, dt, _obj);

                        if (_obj.isWorking) {
                            _totalDays++;
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
                                isWorking: true,
                                date: dt
                            }

                            isOff(i, dt, _obj);

                            if (_obj.isWorking) {
                                _totalDays++;
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

    }, [configuration, holidayList])


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

    for (var i = currentYear; i > currentYear - 70; i--) {
        let opt = <option key={i}>{i}</option>;
        yearOptions.push(opt);
    }



    const updateHolidayHandler = () => {
        getListByYearAndMonth({ year: year, month: month }, (_holidayList) => {
            setHolidayList(_holidayList);
        })
    }

    return <>
        <Holiday addShowState={addHolidayShowState} date={date} month={month} year={year} updateHolidayHandler={updateHolidayHandler} />
        <Row>
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

    </>
}



export default Calander;