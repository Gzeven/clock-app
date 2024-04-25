import { log } from "console";

// api/worldTimeApi.ts
export const fetchWorldTimeData = async () => {
    try {
      const response = await fetch('http://worldtimeapi.org/api/ip');
      if (!response.ok) {
        throw new Error('Failed to fetch data from World Time API');
      }
      const data = await response.json();
      return data;
      
      
    } catch (error) {
      console.error('Error fetching data from World Time API:', error);
      throw error;
    }  
  };

  