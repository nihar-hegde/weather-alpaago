"use client";

import { useState, useEffect } from "react";

import { getWeather } from "@/actions/weather-action";
import WeatherCard from "@/components/WeatherCard";
import useDebounce from "@/hooks/useDebouce";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  // state to store the city name
  const [city, setCity] = useState("New Delhi");

  // remove the useEffect hook

  const getWeatherInfo = async (cityName: string) => {
    const data = await getWeather(cityName);
    setWeatherData(data);
  };
  useEffect(() => {
    // call the getWeatherInfo function with the initial city value
    getWeatherInfo(city);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <form
        className="flex items-center justify-center bg-gray-100"
        onSubmit={(e) => {
          // prevent the default behavior
          e.preventDefault();
          // call the getWeatherInfo function with the city value
          getWeatherInfo(city);
        }}
      >
        <input
          className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter city name"
          type="text"
          id="cityName"
          name="cityName"
          // bind the state variable and the function to the input
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="submit"
        >
          Search
        </button>
      </form>
      {weatherData ? (
        // render the weather card component with the data
        <WeatherCard data={weatherData} />
      ) : (
        // render a loading message
        <p className="text-2xl font-bold">Loading...</p>
      )}
    </main>
  );
};

export default Home;
