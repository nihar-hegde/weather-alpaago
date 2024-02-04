// WeatherCard.tsx
import React from "react";

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const WeatherCard: React.FC<{ data: WeatherData }> = ({ data }) => {
  // convert the temperature from Kelvin to Celsius
  const temp = Math.round(data.main.temp - 273.15);
  // convert the wind speed from m/s to km/h
  const wind = Math.round(data.wind.speed * 3.6);
  // format the date and time
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const time = new Date(data.dt * 1000).toLocaleTimeString();

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <div className="text-center sm:text-left sm:flex-grow">
          <div className="mb-4">
            <p className="text-xl leading-tight">{data.name}</p>
            <p className="text-sm leading-tight text-gray-600">{date}</p>
            <p className="text-sm leading-tight text-gray-600">{time}</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{temp} °C</p>
            <p className="text-lg text-gray-700">
              {data.weather[0].description}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover object-center"
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt={data.weather[0].main}
          />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <svg
            className="h-6 w-6 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15l9 3-4-2-2 1-2-4-3 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.368 19.368C22.324 16.412 23 12.534 23 12c0-.535-.677-4.412-3.632-7.368C16.412 1.676 12.534 1 12 1c-.535 0-4.412.676-7.368 3.632C1.676 7.588 1 11.465 1 12c0 .535.676 4.413 3.632 7.368C7.588 22.324 11.465 23 12 23c.535 0 4.413-.676 7.368-3.632z"
            />
          </svg>
          <p className="text-gray-600">{data.visibility / 1000} km</p>
        </div>
        <div className="flex items-center mt-2">
          <svg
            className="h-6 w-6 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p className="text-gray-600">{wind} km/h</p>
        </div>
        <div className="flex items-center mt-2">
          <svg
            className="h-6 w-6 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16h8M8 12h8M8 8h8M3 20h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-600">{data.main.pressure} hPa</p>
        </div>
        <div className="flex items-center mt-2">
          <svg
            className="h-6 w-6 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-gray-600">{data.main.humidity} %</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
