import React, {useState} from 'react';
import moment from 'moment'
import RemainderModal from './modal'

export default function SingleDay(props){
  
    const [remainder, setRemainder] = useState([])
    const [showModal, isOpenModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    
    const onClickDate = day =>{
        setSelectedDate(day)
        isOpenModal(true)
        
    }
    const saveRemainder = (title,color,time,city) =>{
        const Color = {
            background: color
        }
        let newRemainder = {
            title:title,
            color:Color,
            time:time,
            city:city
        }
        let allRemainders = remainder
        allRemainders.push(newRemainder)
        allRemainders.sort((a,b) =>(a.time > b.time) ? 1: -1)
        setRemainder(allRemainders)
        console.log(remainder)
    }
   
let dateRemainder= remainder.map((oneRemainder)=>
<div className="remainder" style={oneRemainder.color}>{moment(oneRemainder.time).format('h:mm a')}-{oneRemainder.title}</div>)  
    return (
        <>
        <div className={`col oneD ${!moment(props.day).isSame(props.monthDay, 'month')
            ? "disabled" : moment(props.day).isSame(props.selected, 'day')
            ? "selected": ""} 
            ${props.index===0 || props.index===6
            ? "weekend" : "" }`}
            key={props.day}
            onClick={() => onClickDate(moment(props.day))}>
                <span className="number">{props.numberDate}</span>
                {dateRemainder}
        </div>
        {showModal ? <RemainderModal day={selectedDate} show={showModal} closeModal={()=>isOpenModal(false)} 
                        newRemainder={(title,color,time,city)=>saveRemainder(title,color,time,city)}/> : <></>}
        </>
    )
}