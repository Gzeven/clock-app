import axios from 'axios';

export const getLocation = async () => {
  try {
    const response = await axios.get("http://ip-api.com/json/");
    console.log(response);
    
    return {
      city: response.data.city,
      countryCode: response.data.countryCode,
      timeZone: response.data.timezone,

    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { city: "Unknown", countryCode: "??", timeZone: "Unknown" };
  }
};

export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get("https://quotes-api-self.vercel.app/quote");
    return response.data; // Returns { quote, author }
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null; // Handle errors gracefully
  }
};
  