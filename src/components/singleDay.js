import React, { useState, useEffect } from "react";
import moment from "moment";
import ReminderModal from "./modal";
import DateReminder from "./reminder";

export default function SingleDay(props) {
  const [reminders, setReminders] = useState([]);
  const [showModal, isOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editReminder, setEditReminder] = useState(0);
  const [forDelete, setDelete] = useState(0);

  const onClickDate = (day) => {
    setSelectedDate(day);
    isOpenModal(true);
  };
  const saveReminder = (title, color, time, city) => {
    let newReminder = {
      title: title,
      color: color,
      time: time,
      city: city,
    };
    let allReminders = reminders;
    allReminders.push(newReminder);
    allReminders.sort((a, b) => (a.time > b.time ? 1 : -1));
    setReminders(allReminders);
  };

  const edit = (title, color, time, city) => {
    reminders.forEach((oneReminder) => {
      if (oneReminder.city === editReminder.city) {
        oneReminder.title = title;
        oneReminder.color = color;
        oneReminder.time = time;
        oneReminder.city = city;
      }
    });
    let order = reminders;
    order.sort((a, b) => (a.time > b.time ? 1 : -1));
    setReminders(order);
    setEditReminder(0);
  };

  let dateReminder = reminders.map((oneReminder) => (
      <DateReminder key={`singleDay-${oneReminder}`}
        dayReminder={oneReminder}
        toEdit={() => setEditReminder(oneReminder)}
      />
  ));
    
  const changeDelete = (value)=>{
      console.log("probando", value)
        setDelete(value);
    }

    useEffect(()=>{
        if(forDelete === 1){
            const newReminders = reminders.filter((reminder) =>{
                return Object.entries(reminder).toString() !== Object.entries(editReminder).toString()
                    
            }).sort((a, b) => (a.time > b.time ? 1 : -1));
            setReminders(newReminders)
        }else if(forDelete === 2){
            setReminders([])
        }
        setEditReminder(0)
        isOpenModal(false)
        setDelete(0)
    },[forDelete, reminders])

  return (
    <>
      <div
        className={`col oneD ${
          !moment(props.day).isSame(props.monthDay, "month")
            ? "disabled"
            : moment(props.day).isSame(props.selected, "day")
            ? "selected"
            : ""
        } 
            ${props.index === 0 || props.index === 6 ? "weekend" : ""}`}
        key={`singleDay${props.day}`}
        onClick={() => onClickDate(moment(props.day))}
      >
        <span className="number">{props.numberDate}</span>
        {dateReminder}
      </div>
      {showModal ? (
        <ReminderModal
          day={selectedDate}
          show={showModal}
          closeModal={() => isOpenModal(false)}
          newReminder={(title, color, time, city) =>
            saveReminder(title, color, time, city)
          }
          toEdit={editReminder}
          noEdition={() => setEditReminder(0)}
          editReminder={(title, color, time, city) =>
            edit(title, color, time, city)
          }
          deleteReminder={(value)=>changeDelete(value)}
        />
        ) : (
        <></>
      )}
    </>
  );
}
