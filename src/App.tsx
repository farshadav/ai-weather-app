import React, { useState, useEffect } from 'react';
import { City, WeatherData, WeatherResponse } from './types';
import { worldCapitals } from './data/cities';
import { WeatherDisplay } from './components/WeatherDisplay';
import { ChevronDown, Search } from 'lucide-react';

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(worldCapitals[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = worldCapitals.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m`
        );
        const data: WeatherResponse = await response.json();
        
        setWeather({
          temperature: data.current.temperature_2m,
          weatherCode: data.current.weather_code,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchWeather();
  }, [selectedCity]);

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center justify-start p-4 pt-20"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2400&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="relative w-full max-w-md mb-8 z-50">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-4 flex items-center justify-between text-gray-800 font-light shadow-lg"
        >
          <span>{selectedCity.name}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute w-full mt-2 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden max-h-[60vh] flex flex-col">
            <div className="sticky top-0 bg-white/90 p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city);
                    setIsDropdownOpen(false);
                    setSearchTerm('');
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/50 transition-colors text-gray-800 font-light"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="z-0">
        <WeatherDisplay weather={weather} cityName={selectedCity.name} />
      </div>
    </div>
  );
}

export default App;