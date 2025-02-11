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

export const fetchLocation = async () => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    const response = await axios.get(`https://ipinfo.io?token=${token}`);
    console.log(response.data);
    return response.data; // Returns { quote, author }
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null; // Handle errors gracefully
  }
};




