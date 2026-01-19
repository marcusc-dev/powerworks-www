'use client';

import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudFog, Snowflake, Droplets } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  weatherCode: number;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-6 h-6 text-amber-400" />;
  if (code <= 3) return <Cloud className="w-6 h-6 text-slate-400" />;
  if (code <= 48) return <CloudFog className="w-6 h-6 text-slate-400" />;
  if (code <= 67) return <CloudRain className="w-6 h-6 text-sky-400" />;
  if (code <= 77) return <Snowflake className="w-6 h-6 text-sky-200" />;
  if (code <= 86) return <CloudRain className="w-6 h-6 text-sky-400" />;
  if (code >= 95) return <CloudLightning className="w-6 h-6 text-amber-400" />;
  return <Sun className="w-6 h-6 text-amber-400" />;
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
    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
      {/* Subtle header */}
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-3">
        Dubai Weather
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-pulse text-gray-300 text-xs">Loading...</div>
        </div>
      ) : weather ? (
        <div className="flex items-center gap-3">
          {/* Weather Icon */}
          <div className="flex-shrink-0">
            {getWeatherIcon(weather.weatherCode)}
          </div>

          {/* Weather Info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-semibold text-gray-900">{weather.temp}</span>
              <span className="text-sm text-gray-400">°C</span>
            </div>
            <p className="text-xs text-gray-500">{weather.condition}</p>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-1 text-gray-400">
            <Droplets className="w-3.5 h-3.5" />
            <span className="text-xs">{weather.humidity}%</span>
          </div>
        </div>
      ) : null}

      {/* Driving tip - subtle styling */}
      {weather && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-start gap-2.5">
            {/* Vehicle Icon - smaller, subtle */}
            <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Driving Tip</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {weather.temp >= 40
                  ? "Extreme heat - check coolant levels"
                  : weather.temp >= 35
                  ? "Hot day - ensure AC is working"
                  : "Good driving conditions"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
