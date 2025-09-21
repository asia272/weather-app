# 🌦️ Weather App

A modern, responsive, and hackathon-ready weather application that delivers real-time weather forecasts with a clean design, smooth animations, and robust error handling.  

---



## Overview

### The challenge
Users should be able to:
- Search for weather information by entering a location in the search bar.  
- View **current weather conditions** including temperature, weather icon, and location details.  
- See additional metrics: **feels like**, humidity, wind speed, precipitation.  
- Browse a **7-day forecast** with daily high/low temperatures and icons.  
- View an **hourly forecast** showing temperature changes throughout the day.  
- Debounced Search Input → optimized API requests when typing in the search bar.
- Switch between days using the **day selector** in the hourly forecast section.  
- Toggle between **Imperial and Metric units** via the units dropdown.  
- Switch between **Celsius/Fahrenheit**, **km/h–mph**, and **mm–inches** using the dropdown. 
- Navigate search suggestions using keyboard controls (↑ ↓ Enter Escape). 
- Experience a fully **responsive layout** across devices.  
- See **hover and focus states** for all interactive elements.  
- **Skeleton loaders for every main component**:
  - Current Weather → `HeroSkeleton`  
  - Weather Stats → `VarsSkeleton`  
  - Daily Forecast → `DailySkeleton`  
  - Hourly Forecast → `HourlySkeleton`  
  These skeleton components are **created separately** and **rendered conditionally** while data is loading to improve UX and maintain consistent styling.
  
---

**Personal Touch & Enhancements**:  
- Added **plus & bonus animations** for all loading states.  
- Implemented **scroll-based animations (AOS)** for cards and sections.  
- Custom **Not Found image** when a city is invalid. 
- ⌨️ Keyboard navigation on search suggestions → arrow keys to move, Enter to select, Escape to dismiss. 
- Reverse Geocoding (Use My Location) → detect and search weather based on the user’s current location.
---
### Screenshot
 

### Links
- **Live Demo:** (https://weather-app-six-mocha-2yljnsbf39.vercel.app/)  
- **Repository:** (https://github.com/asia272/weather-app)  

---

## My process

### Built with
- ⚛️ [React](https://react.dev/) + [Vite](https://vitejs.dev/) – fast React development  
- 🎨 CSS (variables, flexbox, grid) – responsive styling  
- 🌍 [OpenMeteo API](https://open-meteo.com/) – free real-time weather data  
- ✨ [AOS](https://michalsnik.github.io/aos/) – smooth scroll animations  

- 🖼️ Custom **Not Found image** for error handling  
- 🔤 Fonts: **DM Sans** & **Bricolage Grotesque**  
- 🟢 **Plus & bonus animations** for loading states 

### What I learned
- Handling **API data fetching** (OpenMeteo).  
- Implementing **unit conversion helpers** for temperature, wind, and precipitation.  
- Managing **state across multiple components** (CurrentWeather, WeatherStats, DailyForecast, HourlyForecast).  
- Adding **AOS scroll animations** to cards and sections.  
- Adding **plus & bonus animations** for loading to improve UX.  
- Structuring a project for **hackathon-ready deployment on Vercel**.  
- Creating **individual skeleton components for each main UI component** and rendering them conditionally while waiting for API data.

---
### Continued development
- Add **geolocation support** (auto-detect user’s location).  
- Integrate **charts** for hourly and weekly data visualization.  
- Build a **theme toggle** (dark/light).  
- Cache API responses for **faster performance**.  

### Useful resources
- [OpenMeteo Docs](https://open-meteo.com/) – Weather API reference  
- [AOS Docs](https://michalsnik.github.io/aos/) – Animation on scroll  
- [MDN Date Formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) – weekday formatting  

---

## Author
- GitHub: (https://github.com/asia272)  
- Portfolio: (https://asia-ashraf.vercel.app/)  

---

## Acknowledgments
- Hackathon organizers for the challenge.  
- OpenMeteo for free API data.  
- Inspiration from modern weather app UI designs.  
- ✨ Extra effort: Added **plus & bonus animations**, **scroll-based AOS animations**, and a **Not Found image** to improve UX.  
---
