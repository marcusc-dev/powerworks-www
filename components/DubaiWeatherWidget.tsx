'use client';

import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudFog, Snowflake, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  weatherCode: number;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-8 h-8 text-yellow-400" />;
  if (code <= 3) return <Cloud className="w-8 h-8 text-gray-400" />;
  if (code <= 48) return <CloudFog className="w-8 h-8 text-gray-400" />;
  if (code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
  if (code <= 77) return <Snowflake className="w-8 h-8 text-blue-200" />;
  if (code <= 86) return <CloudRain className="w-8 h-8 text-blue-400" />;
  if (code >= 95) return <CloudLightning className="w-8 h-8 text-yellow-500" />;
  return <Sun className="w-8 h-8 text-yellow-400" />;
};

const getCondition = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
};

export default function DubaiWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto'
        );
        const data = await response.json();

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getCondition(data.current.weather_code),
          humidity: data.current.relative_humidity_2m,
          weatherCode: data.current.weather_code,
        });
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (error || !mounted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-power-blue to-power-blue/90 text-white rounded-xl p-5 shadow-lg">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
        Dubai Weather
      </h3>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div className="animate-pulse text-white/50 text-sm">Loading...</div>
        </div>
      ) : weather ? (
        <div className="flex items-center gap-4">
          {/* Weather Icon */}
          <div className="flex-shrink-0">
            {getWeatherIcon(weather.weatherCode)}
          </div>

          {/* Weather Info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{weather.temp}</span>
              <span className="text-lg text-white/70">°C</span>
            </div>
            <p className="text-sm text-white/80">{weather.condition}</p>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-1.5 text-white/60">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">{weather.humidity}%</span>
          </div>
        </div>
      ) : null}

      {/* Driving tip based on weather */}
      {weather && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-xs text-white/70 flex items-start gap-2">
            <Thermometer className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              {weather.temp >= 40
                ? "Extreme heat - check coolant levels before driving"
                : weather.temp >= 35
                ? "Hot day - ensure your AC is working properly"
                : "Good driving conditions today"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
