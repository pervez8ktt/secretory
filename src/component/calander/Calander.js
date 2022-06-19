import DateObject from "./DateObject";

const Calander = (props) => {

    const currentDate = new Date();
    currentDate.setDate(1);
    const day = currentDate.getDay();

    var d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInAMonth = d.getDate();

    var dt = 1;

    /*
        Immediately invoked function expression:
        
        (_functionDef)()

        Ques: https://stackoverflow.com/questions/22876978/loop-inside-react-jsx

        Ans: https://stackoverflow.com/a/44320193
    
    */ 

    var dayRows = [<tr>
        {(() => {
            let cols = [];

            for (let i = 0; i < 7; i++) {
                if (i < day) {
                    cols.push(<td key={'b-' + i} ></td>);
                } else {
                    cols.push(<DateObject key={i} date={dt} />);
                    dt++
                }

            }
            return cols;
        })()}
    </tr>];

    while (dt <= daysInAMonth) {
        let trComp = <tr>
            {(() => {
                let cols = [];

                for (let i = 0; i < 7; i++) {
                    if (dt > daysInAMonth) {
                        cols.push(<td key={'e-' + i} ></td>);
                    } else {
                        cols.push(<DateObject key={i} date={dt} />);
                        dt++
                    }


                }
                return cols;
            })()}
        </tr>

        dayRows.push(trComp);

    }




    return <>

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

                {dayRows}

            </tbody>
        </table>

    </>
}

export default Calander;