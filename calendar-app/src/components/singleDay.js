import React, {useState} from 'react';
import moment from 'moment'

//class SingleDay extends React.Component{
export default function SingleDay(props){

    
    const [remainder, setRemainder] = useState([])

    return (
        <div className={`col oneD ${!moment(props.day).isSame(props.monthDay, 'month')
            ? "disabled" : moment(props.day).isSame(props.selected, 'day')
            ? "selected": ""} 
            ${props.index===0 || props.index===6
            ? "weekend" : "" }`}
            key={props.day}>
                <span className="number">{props.numberDate}</span>
        </div>
    )
}