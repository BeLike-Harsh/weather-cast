const apiKey = '44c717b1774146dd9f6174235252501'; // Replace with your WeatherAPI key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon'); // Update to display the icon
const temperature = document.getElementById('temperature');
const farenheit = document.querySelector("#farenheit");
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const dateElement = document.getElementById('date');
const weatherInfo = document.getElementById('weather-info');



const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

searchBtn.addEventListener('click', getWeather);
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value;
    if (!city) return;

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        const data = await response.json();
        const today = new Date();

        if (data.error) {
            alert('City not found. Please try again.');
            return;
        }

        cityName.textContent = data.location.name;
        temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
        farenheit.textContent = `${data.current.temp_f}°F`;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
        dateElement.textContent = today.toLocaleDateString(undefined, options);

        // Set the weather icon dynamically
        const iconUrl = data.current.condition.icon;
        weatherIcon.style.display="block";
        weatherIcon.src = `https:${iconUrl}`;
        weatherIcon.alt = data.current.condition.text;

        // Change the background dynamically
        const weatherCondition = data.current.condition.text.toLowerCase(); // Normalize for comparison
        if (weatherCondition=="mist") {
            humidity.style.color="#c4b9b9";
            windSpeed.style.color="#c4b9b9";
        }
        const backgroundMap = {
            "clear": "url('https://img.freepik.com/free-photo/blue-sky-background-with-clouds_1017-21758.jpg?t=st=1737872233~exp=1737875833~hmac=c5f5352c2e2c07843427fb13db00f12eaf47e14085d40644ea414f4c0f2e43fc&w=1380')",
            "partly cloudy": "url('https://img.freepik.com/free-photo/beautiful-scenery-cloudy-sky-landscape-daytime_181624-41959.jpg?t=st=1737872304~exp=1737875904~hmac=685be8ff78d03e8410365437890d29fa1e8b39de121ada1458d4c55e26fd15e0&w=900')",
            "cloudy": "url('https://img.freepik.com/free-photo/cloudy-stormy-black-white-dramatic-sky_146671-19382.jpg?t=st=1737873027~exp=1737876627~hmac=ffad7cb2720530becaf3611a90c4fadf4e299fccd446e0f99df06a885c1aac9c&w=1060')",
            "rain": "url('https://img.freepik.com/premium-photo/rain-drops-window_163782-1802.jpg?w=996')",
            "thunderstorm": "url('https://img.freepik.com/free-photo/white-clouds-brown-mountain_417767-121.jpg?t=st=1737873123~exp=1737876723~hmac=02e735b8d14b0d86430b28f64ec19b76a6b2d708edd767e685342123fe8bdc26&w=1380')",
            "snow": "url('https://img.freepik.com/premium-photo/beautiful-winter-mountain-landscape_127089-2053.jpg?w=996')",
            "mist": "url('https://img.freepik.com/free-photo/mountain-clouds_198169-88.jpg?t=st=1737873225~exp=1737876825~hmac=61026d9930362216b8d53f646bcfaf5a8498da912d39d02747796f82397f6507&w=1060')",
            "overcast": "url('https://images.unsplash.com/photo-1499956827185-0d63ee78a910?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        };

        // Use a default background if condition is not mapped
        weatherInfo.style.backgroundImage =
            backgroundMap[weatherCondition] || "url('https://s7d2.scene7.com/is/image/TWCNews/Mostly_Sunny_Cirrus_Orlando_FL_112822_UGC_KarenLary?wid=1250&hei=703&$wide-bg$')";
        weatherInfo.style.backgroundSize = "cover"; // Ensure it covers the whole div
        weatherInfo.style.backgroundPosition = "center";

        // document.getElementById('weather-info').style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred. Please try again later.');
    }
}