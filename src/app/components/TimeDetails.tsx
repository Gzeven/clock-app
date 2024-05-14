"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWorldTimeData } from "../api/WorldTimeApi";

// Styled components for styling
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

    --gap: 5.875rem;
    --line-offset: calc(var(--gap) / 2);
    --line-thickness: 1px;
    overflow: hidden;
  }
`;

const TimeDetailsContent = styled.div<{$isDaytime: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (min-width: 1280px) {
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
       background-color: ${({ $isDaytime }) =>
    $isDaytime ? "hsla(0,0%,18.8%, 0.25)" : "hsla(0, 100%, 100%, 0.25);"};
      z-index: 1;
    }

    &:before {
      inline-size: var(--line-thickness);
      block-size: 145%;
      inset-block-start: 0;
      inset-inline-start: calc(var(--line-offset) * -2);
    }
  }
`;


const TimeDetails: React.FC<{$isDaytime: boolean }> = ({$isDaytime }) => {
  const [timezone, setTimezone] = useState("");
  const [dayOfYear, setDayOfYear] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [weekNumber, setWeekNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWorldTimeData();
        setTimezone(data.timezone);
        setDayOfYear(data.day_of_year.toString());
        setDayOfWeek(data.day_of_week.toString());
        setWeekNumber(data.week_number.toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TimeDetailsContent $isDaytime={$isDaytime} >
        <p>Current TimeZone</p>
        <h2>{timezone}</h2>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <p>Day of the Year</p>
        <h2>{dayOfYear}</h2>
      </TimeDetailsContent>

      <TimeDetailsContent $isDaytime={$isDaytime}>
        <p>Day of the Week</p>
        <h2>{dayOfWeek}</h2>
      </TimeDetailsContent>
      <TimeDetailsContent $isDaytime={$isDaytime}>
        <p>Week Number</p>
        <h2>{weekNumber}</h2>
      </TimeDetailsContent>
    </Container>
  );
};

export default TimeDetails;
