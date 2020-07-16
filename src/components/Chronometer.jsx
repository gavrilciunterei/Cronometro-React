import React, { Component } from "react";
import { generate as id } from "shortid";
import styled from "styled-components";

const ButtonStyled = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #000;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  margin: 10px;

  &:hover {
    background: linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);
    background-color: #e9e9e9;
  }

  &:disabled {
    position: relative;
    color: #8a8a8a;
  }
`;

const ListStyled = styled.ul`
  list-style: none;
  padding-left: 0;
  font-size: 20px;
`;

class Chronometer extends Component {
  state = {
    started: false,
    running: false,
    millisecounds: 0,
    secounds: 0,
    minutes: 0,
    hours: 0,
    timeStamp: [],
  };

  tick() {
    let millisecounds = this.state.millisecounds + 1;
    let secounds = this.state.secounds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;

    if (millisecounds === 10) {
      millisecounds = 0;
      secounds++;
    }
    if (secounds === 60) {
      secounds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    this.updateTimer(millisecounds, secounds, minutes, hours);
  }

  updateTimer(millisecounds, secounds, minutes, hours) {
    this.setState({
      millisecounds,
      secounds,
      minutes,
      hours,
    });
  }

  handleStart = () => {
    if (!this.state.running) {
      this.interval = setInterval(() => {
        this.tick();
      }, 100);

      this.setState({ running: true, started: true });
    }
  };

  handleStop = () => {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }
  };

  handleTimeStamp = () => {
    const { hours, minutes, secounds, millisecounds, timeStamp } = this.state;

    const newTimeStamp = { hours, minutes, secounds, millisecounds };

    timeStamp.push(newTimeStamp);

    this.setState({
      timeStamp: timeStamp,
    });
  };

  handleReset = () => {
    this.updateTimer(0, 0, 0, 0);
    this.setState({
      timeStamp: [],
    });
  };

  addZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  render() {
    return (
      <>
        <h2>
          {this.addZero(this.state.hours)}:{this.addZero(this.state.minutes)}:
          {this.addZero(this.state.secounds)}:
          {this.addZero(this.state.millisecounds)}
        </h2>
        <ButtonStyled disabled={this.state.running} onClick={this.handleStart}>
          START
        </ButtonStyled>
        <ButtonStyled disabled={!this.state.running} onClick={this.handleStop}>
          STOP
        </ButtonStyled>
        <ButtonStyled
          disabled={!this.state.started}
          onClick={this.handleTimeStamp}
        >
          TIMESTAMP
        </ButtonStyled>
        <ButtonStyled onClick={this.handleReset}>RESET</ButtonStyled>
        <ListStyled>
          {this.state.timeStamp.map((time) => {
            return (
              <li key={id()}>
                {this.addZero(time.hours)}:{this.addZero(time.minutes)}:
                {this.addZero(time.secounds)}:{this.addZero(time.millisecounds)}
              </li>
            );
          })}
        </ListStyled>
      </>
    );
  }
}
export default Chronometer;
