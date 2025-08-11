"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchLocation } from "../api/ApiCalls";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 28px 28px 28px;
  gap: 1rem;
  width: 100%;
  margin: 0 1.625rem;
  @media (min-width: 768px) {
    margin: 0 4rem;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 77px 77px;
    gap: 3rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 105px 105px;
    margin: 0 10.3125rem;
  }
`;

const TimeDetailsContent = styled.div<{ $isDaytime: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TimeDetailsContentTop = styled.div`
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  @media (min-width: 768px) {
    font-size: 0.8125rem;
    letter-spacing: 2.6px;
  }
  @media (min-width: 1280px) {
    font-size: 0.9375rem;
    letter-spacing: 3px;
  }
  
`

const TimeDetailsContentBottom = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 24px;
  @media (min-width: 768px) {
    font-size: 2.5rem;
    line-height: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 3.5rem;
    line-height: 68px;
  }
  
`

const TimeDetails: React.FC<{ $isDaytime: boolean }> = ({ $isDaytime }) => {
  const [timezone, setTimezone] = useState<string>("");
  const [dayOfYear, setDayOfYear] = useState<number>(0);
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = await fetchLocation();
        const userTimezone = locationData.timezone;
        setTimezone(userTimezone);

        const now = new Date();    
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const dayOfWeek = now.getDay() || 7;

        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDays = (now.getTime() - firstDayOfYear.getTime()) / oneDay;
        const weekNumber = Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);

        setDayOfYear(dayOfYear);
        setDayOfWeek(dayOfWeek);
        setWeekNumber(weekNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <TimeDetailsContentTop>Current TimeZone</TimeDetailsContentTop>
        <TimeDetailsContentBottom>{timezone}</TimeDetailsContentBottom>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <TimeDetailsContentTop>Day of the Year</TimeDetailsContentTop>
        <TimeDetailsContentBottom>{dayOfYear}</TimeDetailsContentBottom>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <TimeDetailsContentTop>Day of the Week</TimeDetailsContentTop>
        <TimeDetailsContentBottom>{dayOfWeek}</TimeDetailsContentBottom>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <TimeDetailsContentTop>Week Number</TimeDetailsContentTop>
        <TimeDetailsContentBottom>{weekNumber}</TimeDetailsContentBottom>
      </TimeDetailsContent>
    </Container>
  );
};

export default TimeDetails;