import React, {useState} from 'react';
import {Button} from 'react-bootstrap'
import moment from 'moment'
import RemainderModal from './modal'

export default function SingleDay(props){
  
    const [remainder, setRemainder] = useState([])
    const [showModal, isOpenModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [editRemainder, setEditRemainder] = useState(0)
    
    const onClickDate = day =>{
        setSelectedDate(day)
        isOpenModal(true)
    }
    const saveRemainder = (title,color,time,city) =>{

        let newRemainder = {
            title:title,
            color:color,
            time:time,
            city:city
        }
        let allRemainders = remainder
        allRemainders.push(newRemainder)
        allRemainders.sort((a,b) =>(a.time > b.time) ? 1: -1)
        setRemainder(allRemainders)
    }

    const edit = (title,color,time,city) => {
        remainder.forEach(oneRemainder=>{
            if(oneRemainder.city === editRemainder.city){
                oneRemainder.title=title
                oneRemainder.color=color
                oneRemainder.time=time
                oneRemainder.city=city
            }
        })
        let order = remainder
        order.sort((a,b) =>(a.time > b.time) ? 1: -1)
        setRemainder(order)
        setEditRemainder(0)
    }
   
    let dateRemainder= remainder.map((oneRemainder)=>
    <Button key={oneRemainder} className="remainder" style={{background:oneRemainder.color}} onClick={()=>setEditRemainder(oneRemainder)}>
        {moment(oneRemainder.time).format('h:mm a')}-{oneRemainder.title} 
    </Button>)  
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
                        newRemainder={(title,color,time,city)=>saveRemainder(title,color,time,city)}
                        toEdit={editRemainder}
                        noEdition={()=>setEditRemainder(0)}
                        editRemainder={(title,color,time,city)=>edit(title,color,time,city)}/> : <></>}
        </>
    )
}