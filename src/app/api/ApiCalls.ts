import axios from 'axios';


export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get("https://quotes-api-self.vercel.app/quote");
    return response.data;
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null; 
  }
};


export const fetchLocation = async () => {
  try {
    const response = await fetch("/api/location"); 

    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};





