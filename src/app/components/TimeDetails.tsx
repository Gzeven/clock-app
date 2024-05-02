"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchWorldTimeData } from '../api/WorldTimeApi';


// Styled components for styling
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  grid-template-rows: 28px 28px 28px 28px; 
  gap: 1rem;
  width: 100%;
  /* height: 100vh; */
  /* padding: 3rem 1.625rem; */
  /* padding-inline: 1.625rem; */
  margin: 0 1.625rem;
  @media (min-width: 768px) {
  /* padding: 7.4375rem 4rem; */
  /* padding-inline: 4rem; */
  margin: 0 4rem;
  grid-template-columns: 2fr 1fr; 
  grid-template-rows: 77px 77px; 
  gap: 3rem;
  }
  @media (min-width: 1280px) {
    /* padding: 4.625rem 10.3125rem 3.5rem; */
    grid-template-columns: 2fr 1fr; 
    grid-template-rows: 105px 105px; 
    /* padding-inline: 10.3125rem; */
    margin: 0 10.3125rem;
    /* gap: 3rem 6rem; */
    /* position: relative */
   
   --gap: 5.875rem;
   --line-offset: calc(var(--gap) / 2); 
   --line-thickness: 2px;
  --line-color: hsla(0, 0%, 19%, 0.25); 
  overflow: hidden;
  /* height: 100px;  */
  /* padding: 3rem 1.625rem; */
  /* display: grid; */
  /* grid-template-columns: repeat(2, minmax(0, 1fr)); */
  /* grid-template-columns: 1fr 1fr;   */
  /* grid-template-rows: repeat(4, minmax(0, 80px)); */
  /* grid-template-rows: 70px 70px 70px 70px; */
 
  /* gap: var(--gap); */ 
   
  } 
  /* width: 100%; */
  /* margin-inline: auto; */
  /* margin-block: 3em; */
   /* grid-auto-rows: 1fr;
   */






   

`;



const TimeDetailsContent = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
/* width: 100%; */
@media (min-width: 768px) {
flex-direction: column;
align-items: flex-start;
  }
  @media (min-width: 1280px) {

       /* padding: 3em; */
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  /* justify-content: center; */
  
   position: relative;
   &:before, 
  &:after {
  content: '';
  position: absolute;
  background-color: hsla(0, 0%, 19%, 0.25);
  z-index: 1;
}  

 &:before {
  inline-size: var(--line-thickness);
  block-size: 100vh;
  inset-block-start: 0;
  inset-inline-start: calc(var(--line-offset) * -2);
}  

 
  }









`


const TimeDetailsItem = styled.div`

`

const TimeDetailsData = styled.div`
/* text-align: right; */
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
        <TimeDetailsContent>
          <TimeDetailsItem><h6>Current TimeZone</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{timezone}</h2></TimeDetailsData>
        </TimeDetailsContent>
        <TimeDetailsContent>
        <TimeDetailsItem><h6>Day of the Year</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{dayOfYear}</h2></TimeDetailsData>
        </TimeDetailsContent>
     
      <TimeDetailsContent>
          <TimeDetailsItem><h6>Day of the Week</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{dayOfWeek}</h2></TimeDetailsData>
        </TimeDetailsContent>
        <TimeDetailsContent>
        <TimeDetailsItem><h6>Week Number</h6></TimeDetailsItem>
          <TimeDetailsData><h2>{weekNumber}</h2></TimeDetailsData>
        </TimeDetailsContent>
     
    
    </Container>
  );
};

export default TimeDetails;