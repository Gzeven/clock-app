"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchWorldTimeData } from '../api/WorldTimeApi';

const getBackgroundColor = () => {
  const hour = new Date().getHours();
  return hour >= 5 && hour < 18 ? 'hsla(255, 255%, 255%, 0.75)' : 'hsla(0, 0%, 0%, 0.75)';
};

const getTimeBasedTextColor = () => {
  const hour = new Date().getHours();
  return hour >= 5 && hour < 18 ? 'var(--grey)' : 'var(--white)';
};


// Styled components for styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${getBackgroundColor};
  backdrop-filter: blur(1rem);
  color: ${getTimeBasedTextColor};
  height: 100vh;
  padding: 3rem 1.125rem;
  @media (min-width: 768px) {
 padding: 7.4375rem 4rem;
 gap: 3rem;
  }
  @media (min-width: 1024px) {
    padding: 4.625rem 10.3125rem 3.5rem;
  }
`;

const TimeDetailsColumn = styled.div`
display: grid;
/* flex-direction: column; */
gap: 1rem;
@media (min-width: 768px) {
  grid-template-columns: 2fr 1fr;
/* flex-direction: row; */
/* justify-content: space-between; */

  }
  @media (min-width: 1024px) {
 
  }

`

const TimeDetailsContent = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
@media (min-width: 768px) {
flex-direction: column;
align-items: flex-start;
gap: 0.5rem;
/* flex: 1; */
  }
  @media (min-width: 1024px) {
 
  }

`

const TimeDetailsItem = styled.div`


`

const TimeDetailsData = styled.div`
text-align: right;
`

interface TimeDetailsProps {
  currentTime: string;
  location: string;
}

const TimeDetails: React.FC<TimeDetailsProps> = ({ currentTime, location }) => {
  const [timezone, setTimezone] = useState('');
  const [dayOfYear, setDayOfYear] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [weekNumber, setWeekNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorldTimeData();
        setTimezone(data.timezone);
        setDayOfYear(data.day_of_year.toString());
        setDayOfWeek(data.day_of_week.toString());
        setWeekNumber(data.week_number.toString());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TimeDetailsColumn>
        <TimeDetailsContent>
          <TimeDetailsItem><h6>Current TimeZone</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{timezone}</h2></TimeDetailsData>
        </TimeDetailsContent>
        <TimeDetailsContent>
        <TimeDetailsItem><h6>Day of the Year</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{dayOfYear}</h2></TimeDetailsData>
        </TimeDetailsContent>
      </TimeDetailsColumn>
      <TimeDetailsColumn>
      <TimeDetailsContent>
          <TimeDetailsItem><h6>Day of the Week</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{dayOfWeek}</h2></TimeDetailsData>
        </TimeDetailsContent>
        <TimeDetailsContent>
        <TimeDetailsItem><h6>Week Number</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{weekNumber}</h2></TimeDetailsData>
        </TimeDetailsContent>
      </TimeDetailsColumn>
    </Container>
  );
};

export default TimeDetails;