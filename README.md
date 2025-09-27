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
- Search suggestions are **normalized** → extra spaces inside city names are automatically cleaned (e.g. "k   ara  chi" → "Karachi").  
- Input field auto-clears after submitting a city name (so users don’t have to delete manually). 
- Voice search → start/stop voice input with microphone button, including tooltips and permission handling. 
- Suggestions automatically close when clicking outside the input box.  
- Theme switching → users can toggle between dark and light themes with smooth transitions.
- Custom tooltip support → tooltips for interactive elements like theme toggle and voice search.
- Theme-based icons → search, microphone, dropdown, and checkmark icons change according to the current theme.
- Favorites feature → save/remove favorite cities with a dropdown, live count badge, and quick selection.
-Toast notifications → error & status messages (invalid city, denied location permission, etc.).

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
- Custom tooltip support 
- Theme toggle with dynamic icons and tooltip guidance.
- Voice search → start/stop voice input with microphone button, including tooltips and permission handling.
- Added **plus & bonus animations** for all loading states.  
- Implemented **scroll-based animations (AOS)** for cards and sections.  
- Custom **Not Found image** when a city is invalid. 
- ⌨️ Keyboard navigation on search suggestions → arrow keys to move, Enter to select, Escape to dismiss. 
- Reverse Geocoding (Use My Location) → detect and search weather based on the user’s current location.
- Smart input handling: removed extra spaces in city names (normalized input), auto-cleared the search box after submission, and auto-closed suggestions when clicking outside for a smoother experience.  
- Added toast notifications for errors and status feedback.
- Favorites system with live badge count


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
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)– for easy, customizable toast notifications (used for errors & status messages) 
- 🖼️ Custom **Not Found image** for error handling  
- 🔤 Fonts: **DM Sans** & **Bricolage Grotesque**  
- 🟢 **Plus & bonus animations** for loading states 
⏳ Debounced Search Hook (useDebounce) to reduce API calls

🔄 Reverse Geocoding API to convert latitude/longitude → city name

⌨️ Keyboard navigation support for better UX in search suggestions
🗣️ Voice search integration with dynamic tooltips and permission handling

🌗 Theme toggle with icons and tooltips
⭐ Favorites dropdown with count badge

🔔 Toast notifications for error/status messages

### What I learned
- Handling **API data fetching** (OpenMeteo).  
- Implementing **unit conversion helpers** for temperature, wind, and precipitation.  
- Managing **state across multiple components** (CurrentWeather, WeatherStats, DailyForecast, HourlyForecast).  
- Adding **AOS scroll animations** to cards and sections.  
- Adding **plus & bonus animations** for loading to improve UX.  
- Structuring a project for **hackathon-ready deployment on Vercel**.  
- Creating **individual skeleton components for each main UI component** and rendering them conditionally while waiting for API data.

- Using reverse geocoding to auto-detect the user’s location.

- Applying debounce to optimize performance of search suggestions.
- Implemented input normalization to handle edge cases (like multiple spaces in city names).  
- Learned to auto-clear inputs after a  search to improve UX.  
- Managed suggestion dropdown closing on outside clicks.  
- Enhanced keyboard navigation on search suggestions (Arrow ↑ ↓, Enter, Escape).  
- Voice search implementation using Web Speech API with dynamic tooltip guidance.

- Theme switching with dynamic icons and tooltip descriptions.
- Toast notifications for real-time feedback.
- Favorites system for saving frequently checked cities.
---
### Continued development
- Integrate **charts** for hourly and weekly data visualization.  
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
🙏 Hackathon organizers for the challenge and motivation.

🌍 OpenMeteo API for providing free and reliable weather data.

⚛️ React + Vite and ✨ AOS for making development faster and smoother.

📚 Open-source contributors & documentation writers whose guides helped me implement tricky features.

💡 Inspiration from modern weather app UI designs for the clean look.
---
