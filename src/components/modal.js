import React, { useState } from "react";
import moment from "moment";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { GithubPicker } from "react-color";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReminderModal(props) {
  const API_KEY = "719c57517d2b1db16229d727f45763ac";
  const [title, changeTitle] = useState(props.toEdit.title);
  const [color, changeColor] = useState(props.toEdit.color);
  const [selectedCity, setSelectedCity] = useState(props.toEdit.city);
  const [reminderTime, setTime] = useState(props.toEdit.time);
  const [weather, setWeather] = useState();
  const city = [
    { id: 4164138, name: "Miami" },
    { id: 3600949, name: "Tegucigalpa" },
    { id: 3117735, name: "Madrid" },
    { id: 5134295, name: "Rome" },
    { id: 3688689, name: "Bogotá" },
  ];

  const updateInputValue = (evt) => {
    changeTitle(evt.target.value);
  };

  const handleChangeComplete = (color) => {
    changeColor(color.hex);
  };
  const handleDropDownChange = (e) => {
    setSelectedCity(e.target.value);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${e.target.value}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setWeather(result.weather[0].description);
        },
        (error) => {
          setWeather("NO response");
        }
      );
  };
  const styleObj = {
    background: color,
  };

  const toDay = () => {
    if (props.toEdit !== 0) {
      props.editReminder(title, color, reminderTime, selectedCity);
    } else {
      props.newReminder(title, color, reminderTime, selectedCity, props.day);
    }
    props.closeModal();
  };

  let optionCities = city.map((city) => (
    <option value={city.id} key={`modal-${city.id}`}>
      {city.name}
    </option>
  ));
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.closeModal();
          props.noEdition();
        }}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : "New Reminder"}</Modal.Title>
        </Modal.Header>
        {props.toEdit !== 0 ? (
            <>
              <Row>
                <Col>
                  <Button onClick={()=>props.deleteReminder(1)} className="delete">Delete This</Button>
                </Col>
                <Col>
                  <Button onClick={()=>props.deleteReminder(2)} className="delete">Delete All</Button>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        <Modal.Body>
          <p>{moment(props.day).format("MMMM DD YYYY")}</p>
          <DatePicker
            selected={reminderTime}
            onChange={(date) => setTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Reminder Title:
              </span>
            </div>
            <input
              value={title ? title : ""}
              onChange={updateInputValue}
              type="text"
              className="form-control"
              aria-describedby="basic-addon1"
              maxLength="30"
            />
          </div>
          <p>Select City:</p>
          <select onChange={handleDropDownChange}>{optionCities}</select>
          <p>City Weather: {weather}</p>
          <p>Select a color:</p>
          <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          <p style={styleObj}>COLOR</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.closeModal();
              props.noEdition();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={toDay}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
