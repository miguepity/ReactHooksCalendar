import React, {useState} from 'react';
import moment from 'moment'
import Modal from './modal'

export default function SingleDay(props){
  
    const [remainder, setRemainder] = useState([])
    const [showModal, isOpenModal] = useState(false)
    
    
    const onClickDate = day =>{
        isOpenModal(true)
    }
        
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
        </div>
        {showModal ? <Modal /> : <></>}
        </>
    )
}