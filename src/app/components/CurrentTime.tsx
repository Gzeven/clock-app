"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styled from 'styled-components';
import { fetchWorldTimeData } from '../api/WorldTimeApi';
import axios from 'axios';
import ToggleButton from './ToggleButton';

// Styled components for styling
const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  /* gap: 1rem; */
  /* padding: 6.1875rem 1.625rem 2.5rem; */
  /* padding: 0 1.625rem; */
  padding: 6.1875rem 1.625rem 0;;
  @media (min-width: 768px) {
    padding: 9.5625rem 4rem 4rem;
    gap: 0;
  }
  @media (min-width: 1024px) {
    padding: 3.5rem 10.3125rem;
 display:flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-end;
  }
`;

const GreetingContainer = styled.div`
  display: flex;
  img {
    width: 24px;
    height: 24px;
    margin-right: 1.0625rem;
  }
  /* align-items: center; */
`;

const Greeting = styled.div`
  
`;

const ExtraGreeting = styled.div`
display: none;
@media (min-width: 768px) {
  display: flex;
  }
  @media (min-width: 1024px) {
 
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  
`;

const Time = styled.div`
  font-size: 20px;
  margin-right: 5px; /* Add margin to separate time and abbreviation */
`;

const Abbreviation = styled.div`
font-weight: 300;
font-size: 15px;
line-height: 28px;
text-transform: uppercase;
color: var(--white);
margin-bottom: 0.3rem;
margin-left: 0.8125rem;
@media (min-width: 768px) {
  margin-bottom: 1.4rem;
  font-size: 2rem;
  }
  @media (min-width: 1024px) {
 
  }
`;

const LocationContainer = styled.div`
display: flex;
  font-size: 16px;
  gap: 0.5rem;
  @media (min-width: 768px) {
  margin-bottom: 5rem;
  }
  @media (min-width: 1024px) {
 margin-bottom: 0;
  }
`;

interface CurrentTimeProps {
  location: string;
  toggleComponents: () => void; // Function to toggle TimeDetails component
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ location, toggleComponents }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState('');
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isTimeDetailsExpanded, setIsTimeDetailsExpanded] = useState(false);


  const toggleTimeDetails = () => {
    setIsTimeDetailsExpanded(!isTimeDetailsExpanded);
    toggleComponents();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorldTimeData();
        const hour = new Date(data.datetime).getHours();
        setCurrentTime(data.datetime.slice(11, 16)); // Extract hours and minutes from datetime
        setAbbreviation(data.abbreviation);

        // Determine the greeting based on the time of day
        if (hour >= 5 && hour < 12) {
          setGreeting('Good morning');
        } else if (hour >= 12 && hour < 18) {
          setGreeting('Good afternoon');
        } else {
          setGreeting('Good evening');
        }

        // Determine the icon based on the time of day
        if (hour >= 6 && hour < 17) {
          setIcon('/assets/desktop/icon-sun.svg');
        } else {
          setIcon('/assets/desktop/icon-moon.svg');
        }

        // Fetch current location using IP-API
        const response = await axios.get('https://freeipapi.com/api/json/');
        setCity(response.data.cityName);
        setCountryCode(response.data.countryCode);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    // Update current time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
     
       // Check if it's 6 o'clock and update greeting and icon accordingly
    if (hours === '06') {
      setGreeting('Good morning');
      setIcon('/assets/desktop/icon-sun.svg');
    } else if (hours === '18') {
      setGreeting('Good evening');
      setIcon('/assets/desktop/icon-moon.svg');
    }
  
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <Container>
      <div>
      <GreetingContainer>
      {icon && <Image src={icon} alt="Icon" width={24} height={24} />}
        <Greeting><h4>{greeting}</h4></Greeting>
        <ExtraGreeting><h4>, it&apos;s currently</h4>, </ExtraGreeting>
      </GreetingContainer>
      <TimeContainer>
      
        <Time><h1>{currentTime}</h1></Time>
        <Abbreviation>{abbreviation}</Abbreviation>
  
      </TimeContainer>
      <LocationContainer>
        {city && <div><h3>In {city},</h3></div>}
        {countryCode && <div><h3>{countryCode}</h3></div>}
      </LocationContainer>
      </div>
      <ToggleButton $isExpanded={isTimeDetailsExpanded} onClick={toggleTimeDetails} toggleComponents={toggleComponents} />
    </Container>
  );
};

export default CurrentTime;