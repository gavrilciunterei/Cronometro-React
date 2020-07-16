import React, { useState, useEffect } from "react";
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

const Chronometer = () => {
  const [clock, setClock] = useState({
    millisecounds: 0,
    secounds: 0,
    minutes: 0,
    hours: 0,
  });

  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeStamp, setTimeStamp] = useState([]);

  const tick = () => {
    let { hours, minutes, secounds, millisecounds } = clock;
    millisecounds++;

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

    updateTimer(millisecounds, secounds, minutes, hours);
  };

  const updateTimer = (millisecounds, secounds, minutes, hours) => {
    setClock({
      millisecounds,
      secounds,
      minutes,
      hours,
    });
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        tick();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [running, clock]);

  const handleStart = () => {
    if (!running) {
      setRunning(true);
      setStarted(true);
    }
  };

  const handleStop = () => {
    if (running) {
      setRunning(false);
    }
  };

  const handleTimeStamp = () => {
    const newTimeStamp = {
      hours: clock.hours,
      minutes: clock.minutes,
      secounds: clock.secounds,
      millisecounds: clock.secounds,
    };

    setTimeStamp([...timeStamp, newTimeStamp]);
  };

  const handleReset = () => {
    updateTimer(0, 0, 0, 0);
    setTimeStamp([]);
  };

  const addZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <>
      <h2>
        {addZero(clock.hours)}:{addZero(clock.minutes)}:
        {addZero(clock.secounds)}:{addZero(clock.millisecounds)}
      </h2>
      <ButtonStyled disabled={running} onClick={handleStart}>
        START
      </ButtonStyled>
      <ButtonStyled disabled={!running} onClick={handleStop}>
        STOP
      </ButtonStyled>
      <ButtonStyled disabled={!started} onClick={handleTimeStamp}>
        TIMESTAMP
      </ButtonStyled>
      <ButtonStyled onClick={handleReset}>RESET</ButtonStyled>
      <ListStyled>
        {timeStamp.map((time) => {
          return (
            <li key={id()}>
              {addZero(time.hours)}:{addZero(time.minutes)}:
              {addZero(time.secounds)}:{addZero(time.millisecounds)}
            </li>
          );
        })}
      </ListStyled>
    </>
  );
};
export default Chronometer;
