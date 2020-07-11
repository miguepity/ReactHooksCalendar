import React, {useState} from 'react';
import moment from 'moment'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const header = () => {
        
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={previousMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{moment(currentDate).format('MMMM YYYY')}</span>
                </div>
                <div className="col col-end">
                    <div className="icon" onClick={nextMonth}>
                        chevron_rigth
                    </div>
                </div>
            </div>
        )
    }

    const previousMonth = () =>{
        setCurrentDate(moment(currentDate).add(1,'M'))
    }

    const nextMonth = () =>{
        setCurrentDate(moment(currentDate).subtract(1,'M'))
    }
    
    const weekDays = () =>{
        const days = moment.weekdays()
        return <div className="days row">{days}</div>
    }

    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{weekDays()}</div>
        </div>
    )
}

export default Calendar