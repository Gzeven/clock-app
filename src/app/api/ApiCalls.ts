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
    const response = await fetch("/api/location"); // ✅ Correct API route

    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    console.log("User location:", data);
    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};


// export const fetchLocation = async () => {
// const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
//   try {
//     const response = await axios.get(`https://ipinfo.io/?token=${token}`);
    
//    console.log(response);
   
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching random quote:", error);
//     return null; 
//   }
// };




