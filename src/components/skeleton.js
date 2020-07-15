import "./skeleton.css";
import React, { useState } from "react";
import SingleDay from "./singleDay";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const header = () => {
    return (
      <Row className="header">
        <Col>
          <div className="icon" onClick={previousMonth}>
            <i className="fas fa-chevron-left"></i>
          </div>
        </Col>
        <Col>
          <strong>{moment(currentDate).format("MMMM YYYY")}</strong>
        </Col>
        <Col>
          <div className="icon" onClick={nextMonth}>
            <i className="fas fa-chevron-right"></i>
          </div>
        </Col>
      </Row>
    );
  };

  const previousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "M"));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "M"));
  };

  const weekDays = () => {
    const weekDays = moment.weekdays();
    const days = [];

    weekDays.forEach((week, index) => {
      days.push(
        <div className="col col-center" key={`skeleton1-${index}`}>
          {week}
        </div>
      );
    });
    return <div className="days row">{days}</div>;
  };

  const weekMonth = () => {
    const firstDayMonth = moment(currentDate).startOf("month");
    const lastDayMonth = moment(currentDate).endOf("month");
    const firstDate = moment(firstDayMonth).startOf("week");
    const lastDate = moment(lastDayMonth).endOf("week");
    const row = [];

    let days = [];
    let day = firstDate;
    let dateFormat = "";

    while (day <= lastDate) {
      for (let i = 0; i < 7; i++) {
        dateFormat = moment(day).format("D");
        days.push(
          <SingleDay
            monthDay={firstDayMonth}
            day={day}
            numberDate={dateFormat}
            index={i}
            key={day - i}
          />
        );
        day = moment(day).add(1, "d");
      }
      row.push(<Row key={`skeleton-${day}`}>{days}</Row>);
      days = [];
    }
    return <div className="body">{row}</div>;
  };

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{weekDays()}</div>
      <div>{weekMonth()}</div>
    </div>
  );
};

export default Calendar;
