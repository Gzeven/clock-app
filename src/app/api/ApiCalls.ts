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
    const response = await axios.get("https://ipinfo.io/?callback=callback&token=a48cb5037f6e2a");
    return response.data;
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null; 
  }
};

// export const fetchLocation = async () => {
//   try {
//     const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
//     // const response = await axios.get(`https://ipinfo.io?token=${token}`);
//     const response = await axios.get(`http://ipinfo.io/?callback=callback&token=a48cb5037f6e2a`);
//     https://ipinfo.io/8.8.8.8/json?token=a48cb5037f6e2a
//     console.log("Hello Icognito");
//     return response.data; // Returns { quote, author }
//   } catch (error) {
//     console.error("Error fetching random quote:", error);
//     return null; // Handle errors gracefully
//   }
// };







