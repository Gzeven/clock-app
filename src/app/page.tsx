"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentTime from "./components/CurrentTime";
import Quote from "./components/Quote";
import TimeDetails from "./components/TimeDetails";
import { fetchWorldTimeData } from "./api/ApiCalls";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding-inline: 1.625rem;
  padding-bottom: 2.5rem;
  @media (min-width: 768px) {
    padding-inline: 4rem;
    padding-bottom: 4rem;
  }
  @media (min-width: 1280px) {
    padding-inline: 10.3125rem;
    padding-bottom: 3.5rem;
  }
`;

const SidebarBottom = styled.div<{ $isOpen: boolean; $isDaytime: boolean }>`
  height: ${({ $isOpen }) => ($isOpen ? "0" : "38%")};
  overflow: hidden;
  transition: height 0.8s ease-in-out;
  background-color: ${({ $isDaytime }) =>
    $isDaytime ? "hsla(255, 255%, 255%, 0.75)" : "hsla(0, 0%, 0%, 0.75)"};
  color: ${({ $isDaytime }) => ($isDaytime ? "var(--black)" : "var(--white)")};
  backdrop-filter: blur(20.3871px);
  -webkit-backdrop-filter: blur(20.3871px);
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    height: ${({ $isOpen }) => ($isOpen ? "0" : "42%")};
  }
  @media (min-width: 1280px) {
    height: ${({ $isOpen }) => ($isOpen ? "0" : "50%")};
  }
`;

const SidebarTop = styled.div<{ $isOpen: boolean }>`
  flex: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
  overflow: hidden;
  transition: flex 0.8s ease-in-out;
`;

export default function Home() {
  const [showQuote, setShowQuote] = useState(true);
  const [showTimeDetails, setShowTimeDetails] = useState(true);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const updateDaytimeStatus = () => {
      const now = new Date();
      const hour = now.getHours();

      // Determine if it's daytime based on the current hour
      const newIsDaytime = hour >= 5 && hour < 18;
      setIsDaytime(newIsDaytime);
    };

    // Call the function initially
    updateDaytimeStatus();

    // Update every minute
    const intervalId = setInterval(updateDaytimeStatus, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const toggleComponents = () => {
    setShowQuote(!showQuote);
    setShowTimeDetails(!showTimeDetails);
  };

  return (
    <Container className={isDaytime ? "daytime" : "nighttime"}>
      <SidebarTop $isOpen={!showTimeDetails}>
        <Quote />
      </SidebarTop>
      <MainContent>
        <CurrentTime
          location="Your Location"
          toggleComponents={toggleComponents}
        />
      </MainContent>
      <SidebarBottom $isOpen={showTimeDetails} $isDaytime={isDaytime}>
        <TimeDetails $isDaytime={isDaytime}/>
      </SidebarBottom>
    </Container>
  );
}
