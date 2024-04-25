"use client"
import { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentTime from "./components/CurrentTime";
import Quote from "./components/Quote";
import TimeDetails from "./components/TimeDetails";
import { fetchWorldTimeData } from "./api/WorldTimeApi";


const Container = styled.div` // Define ContainerProps interface
  display: flex;
  flex-direction: column;
  /* height: 100vh; Ensure the container takes up the full height of the viewport */
  height: 100vh;
`;


const MainContent = styled.div`
  /* flex: 1; */
`;

const SidebarBottom = styled.div<{ $isOpen: boolean }>`
  height: ${({ $isOpen }) => ($isOpen ? "0" : "50%")};
  overflow: hidden;
  transition: height 0.8s ease-in-out;
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


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchWorldTimeData();
  //       const hour = new Date(data.datetime).getHours();
  //       const newIsDaytime = hour >= 5 && hour < 18;
  //       setIsDaytime(newIsDaytime);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
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
    <Container className={isDaytime ? 'daytime' : 'nighttime'}>
       
      <SidebarTop $isOpen={!showTimeDetails}>
        <Quote />
      </SidebarTop>
      <MainContent>
        <CurrentTime location="Your Location" toggleComponents={toggleComponents} />
      </MainContent>
      <SidebarBottom $isOpen={showTimeDetails}>
        <TimeDetails currentTime="Current Time" location="Your Location" />
      </SidebarBottom>
    </Container>
    
  );
}
