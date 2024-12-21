// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = '53d34b8a9a43fa863aad7835dd3472c0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Select DOM elements
const cityInput = document.getElementById('cityInput');
const fetchWeather = document.getElementById('fetchWeather');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');

// Function to fetch weather data
async function getWeather(city) {
  try {
    // Fetch data from OpenWeatherMap API
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('City not found. Please try again.');
    }

    // Parse the JSON data
    const data = await response.json();

    // Extract relevant information
    const { name, sys, main, weather } = data;

    // Update HTML content dynamically
    locationDisplay.textContent = `${name}, ${sys.country}`;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Description: ${weather[0].description}`;
  } catch (error) {
    alert(error.message); // Handle errors (e.g., city not found, network issues)
  }
}

// Event listener for button click
fetchWeather.addEventListener('click', () => {
  const city = cityInput.value.trim(); // Get input value and trim whitespace
  if (city) {
    getWeather(city); // Call the function with the entered city
  } else {
    alert('Please enter a city name'); // Prompt user to enter a city
  }
});
