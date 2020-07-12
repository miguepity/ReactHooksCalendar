import './skeleton.css';
import React, {useState} from 'react';
import SingleDay from './singleDay'
import moment from 'moment'


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const header = () => {
        
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={previousMonth}>
                    <i className="fas fa-chevron-left"></i>                        
                    </div>
                </div>
                <div className="col col-center">
                    <strong>{moment(currentDate).format('MMMM YYYY')}</strong>
                </div>
                <div className="col col-end">
                    <div className="icon" onClick={nextMonth}>
                    <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        )
    }

    const previousMonth = () =>{
        setCurrentDate(moment(currentDate).subtract(1,'M'))
    }

    const nextMonth = () =>{
        setCurrentDate(moment(currentDate).add(1,'M'))
    }
    
    const weekDays = () =>{
        const weekDays = moment.weekdays()
        const days = []

        weekDays.map((week,index) =>{
            days.push(
                <div className="col col-center" key={index}>
                    {week}
                </div>
            )
        })
        return <div className="days row">{days}</div>
    }

    const weekMonth = () =>{
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
                days.push(
                    <SingleDay monthDay={firstDayMonth} 
                    day={day} 
                    numberDate={dateFormat}
                    index={i}/>
                )
                day = moment(day).add(1,'d')
            }
            row.push(
                <div className="row" key={day}>{days}</div>
            )
            days = []
        }
        return <div className="body">{row}</div>
    }    

    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{weekDays()}</div>
            <div>{weekMonth()}</div>
        </div>
    )
}

export default Calendar