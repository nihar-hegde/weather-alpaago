"use server";

export const getWeather = async (cityName: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATEHR_API_KEY}`
    );
    const data = await res.json();
    // console.log(res);
    return data;
  } catch (error) {
    console.log(error);
  }
};
