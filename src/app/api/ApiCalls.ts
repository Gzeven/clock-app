import axios from 'axios';


export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get("https://quotes-api-self.vercel.app/quote");
    return response.data; // Returns { quote, author }
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null; // Handle errors gracefully
  }
};


export const getLocation = async () => {
  try {
    const response = await fetch("/api/location");
    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    return {
      city: data.city,
      countryCode: data.country,
      timeZone: data.timezone,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { city: "Unknown", countryCode: "??", timeZone: "Unknown" };
  }
};
  