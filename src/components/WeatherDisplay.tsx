import React from 'react';
import { WeatherData } from '../types';
import { getWeatherDescription } from '../utils/weather';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherDisplayProps {
  weather: WeatherData | null;
  cityName: string;
}

export function WeatherDisplay({ weather, cityName }: WeatherDisplayProps) {
  if (!weather) return null;

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg">
      <h2 className="text-4xl font-light mb-6 text-gray-800">{cityName}</h2>
      
      <div className="text-6xl font-light text-gray-800 mb-8">
        {Math.round(weather.temperature)}°C
      </div>
      
      <div className="text-xl text-gray-600 mb-8">
        {getWeatherDescription(weather.weatherCode)}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Wind className="w-5 h-5" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Droplets className="w-5 h-5" />
          <span>{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
}