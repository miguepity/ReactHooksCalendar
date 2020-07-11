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

    const oneDay = () =>{
        const firstDayMonth = moment(currentDate).startOf('month')
        const lastDayMonth = moment(currentDate).endOf('month')
        const firstDate = moment(firstDayMonth).startOf('week')
        const lastDate = moment(lastDayMonth).endOf('week')
        const row = []

        let days = []
        let day = firstDate
        let dateFormat = ""

        while(day <= lastDate){
            for(let i =0; i < 7; i++){
                dateFormat = moment(day).format('D')
                const sameDay = day
                days.push(
                    <div className={`col oneD ${!moment().isSame(day,firstDayMonth)
                    ? "disable" : moment().isSame(day, selectedDate)
                    ? "selected": ""}`}
                    key={day}
                    onClick={() => onClickDate(moment(sameDay))}>
                        <span className="number">{dateFormat}</span>
                    </div>
                )
                day = moment(day).add(1,'d')
            }
            row.push(
                <div className="row" kewy={day}>{days}</div>
            )
            days = []
        }
        return <div className="body">{row}</div>
    }

    const onClickDate = day =>{
        setSelectedDate(day)
        alert(selectedDate)
    }

    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{weekDays()}</div>
            <div>{oneDay()}</div>
        </div>
    )
}

export default Calendar