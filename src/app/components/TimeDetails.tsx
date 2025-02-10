"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getLocation } from "../api/ApiCalls";

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

const TimeDetails: React.FC<{ $isDaytime: boolean }> = ({ $isDaytime }) => {
  const [timezone, setTimezone] = useState<string>("");
  const [dayOfYear, setDayOfYear] = useState<number>(0);
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user location
        const locationData = await getLocation();
        const userTimezone = locationData.timeZone;
        setTimezone(userTimezone);

        const now = new Date();

        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const dayOfWeek = now.getDay();

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
        <h6>Current TimeZone</h6>
        <h2>{timezone}</h2>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <h6>Day of the Year</h6>
        <h2>{dayOfYear}</h2>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <h6>Day of the Week</h6>
        <h2>{dayOfWeek}</h2>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <h6>Week Number</h6>
        <h2>{weekNumber}</h2>
      </TimeDetailsContent>
    </Container>
  );
};

export default TimeDetails;