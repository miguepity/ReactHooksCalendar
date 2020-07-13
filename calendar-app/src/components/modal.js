import React, {useState} from 'react';
import moment from 'moment'
import {Button, Modal} from 'react-bootstrap'
import { GithubPicker } from 'react-color'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RemainderModal(props){
  const API_KEY = "719c57517d2b1db16229d727f45763ac"
  const [color, changeColor] = useState('#fff')
  const [city, setCity] = useState([{"id":4164138,"name":"Miami"}, 
                                    {"id":3600949,"name":"Tegucigalpa"}, 
                                    {"id":3117735,"name":"Madrid"}, 
                                    {"id":5134295,"name":"Rome"},
                                    {"id":3688689,"name":"Bogotá"}])
  const [selectedCity, setSelectedCity] = useState()
  const [remainderTime, setTime] =useState()
  const [weather, setWeather] = useState()

  const handleChangeComplete = (color) => {
    changeColor(color.hex)
  } 
  const handleDropDownChange = (e) =>{
    setSelectedCity(e.target.value)
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${selectedCity}&appid=${API_KEY}`)
    .then(res => res.json())
    .then((result) =>{
      setWeather(result.weather[0].description)
    },
    (error) =>{
      setWeather("NO response")
    })
  } 
  const styleObj = {
    background: color
  }

  const toDay = () =>{
    
    props.closeModal()
  }


  let optionCities = city.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)
  return (
    <>
      <Modal show={props.show} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Remainder</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <p>{moment(props.day).format("MMMM DD YYYY")}</p>
            <DatePicker
              selected={remainderTime}
              onChange={date => setTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"/>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Remainder Title:</span>
              </div>
              <input type="text" className="form-control" aria-describedby="basic-addon1" maxLength="30"/>
            </div>
            <p>Select City:</p>
            <select onChange={handleDropDownChange}>
              {optionCities} 
            </select>
            <p>City Weather: {weather}</p>
            <p>Select a color:</p>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete}/>
            <p style={styleObj}>COLOR</p>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toDay}>
            Close
          </Button>
          <Button variant="primary" onClick={props.closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
} 
