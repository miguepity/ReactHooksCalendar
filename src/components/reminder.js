import React from "react";
import moment from "moment";
import { Button } from "react-bootstrap";

export default function DateReminder(props) {
  return (
    <Button
      key={`reminder-${props.dayReminder}`}
      className="reminder"
      style={{ background: props.dayReminder.color }}
      onClick={() => props.toEdit()}
    >
      {moment(props.dayReminder.time).format("h:mm a")}-
      {props.dayReminder.title}
    </Button>
  );
}
