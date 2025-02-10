"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { getLocation } from "../api/ApiCalls";
import ToggleButton from "./ToggleButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  @media (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const GreetingContainer = styled.div`
  display: flex;
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1.0625rem;
  }
`;

const Greeting = styled.h4`
  margin: 0;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Time = styled.h1`
  margin-right: 5px;
`;

const LocationContainer = styled.div`
  display: flex;
  font-size: 1rem;
  gap: 0.5rem;
  @media (min-width: 1280px) {
     margin-bottom: 0;
  }
`;

interface CurrentTimeProps {
  location: string;
  toggleComponents: () => void;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ toggleComponents }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isTimeDetailsExpanded, setIsTimeDetailsExpanded] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getLocation();
      setCity(location.city);
      setCountryCode(location.countryCode);
    };

    fetchLocation();

    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");

      setCurrentTime(`${hours}:${minutes}`);

      if (hours >= 5 && hours < 12) {
        setGreeting("Good morning");
        setIcon("/assets/desktop/icon-sun.svg");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Good afternoon");
        setIcon("/assets/desktop/icon-sun.svg");
      } else {
        setGreeting("Good evening");
        setIcon("/assets/desktop/icon-moon.svg");
      }
    };

    updateTimeAndGreeting();
    const intervalId = setInterval(updateTimeAndGreeting, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <div>
        <GreetingContainer>
          {icon && <Image src={icon} alt="Icon" width={24} height={24} />}
          <Greeting>{greeting}, its currently</Greeting>
        </GreetingContainer>
        <TimeContainer>
          <Time>{currentTime}</Time>
        </TimeContainer>
        <LocationContainer>
          {city && <h3>In {city},</h3>}
          {countryCode && <h3>{countryCode}</h3>}
        </LocationContainer>
      </div>
      <ToggleButton
        $isExpanded={isTimeDetailsExpanded}
        onClick={() => {
          setIsTimeDetailsExpanded(!isTimeDetailsExpanded);
          toggleComponents();
        }}
        toggleComponents={toggleComponents}
      />
    </Container>
  );
};

export default CurrentTime;
