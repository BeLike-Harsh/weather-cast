const apiKey = '44c717b1774146dd9f6174235252501';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const farenheit = document.querySelector("#farenheit");
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const dateElement = document.getElementById('date');
const weatherInfo = document.getElementById('weather-info');
const context = document.querySelector('#context');

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

searchBtn.addEventListener('click', getWeather);
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        context.textContent = "";
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
        weatherIcon.style.display = "block";
        weatherIcon.src = `https:${iconUrl}`;
        weatherIcon.alt = data.current.condition.text;

        // Change the background dynamically
        const weatherCondition = data.current.condition.text.toLowerCase();

        const backgroundMap = {
            "clear": "url('https://static.vecteezy.com/system/resources/previews/015/134/640/large_2x/a-view-of-the-sky-with-clear-weather-in-the-morning-the-lush-green-fields-are-outdoors-agricultural-landscape-background-design-template-for-book-cover-magazine-website-photo.jpg')",
            "partly cloudy": "url('https://w0.peakpx.com/wallpaper/981/146/HD-wallpaper-clouds-nature-partly-cloudy-sky-weather.jpg')",
            "cloudy": "url('https://i.pinimg.com/originals/55/cf/34/55cf3416e9ba4ab3686ef6b82369099c.jpg')",
            "rain": "url('https://wallpaperaccess.com/full/164284.jpg')",
            "thunderstorm": "url('https://get.pxhere.com/photo/sky-cloud-atmosphere-thunder-cumulus-lightning-daytime-storm-darkness-evening-geological-phenomenon-thunderstorm-meteorological-phenomenon-computer-wallpaper-calm-dusk-wind-horizon-dawn-1438107.jpg')",
            "snow": "url('https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg?auto=compress&cs=tinysrgb&w=600')",
            "mist": "url('https://wallpapercave.com/wp/GD69qeX.jpg')",
            "overcast": "url('https://wallpaper.dog/large/10758686.jpg')",
            "sunny": "url('https://static.vecteezy.com/system/resources/previews/015/134/640/large_2x/a-view-of-the-sky-with-clear-weather-in-the-morning-the-lush-green-fields-are-outdoors-agricultural-landscape-background-design-template-for-book-cover-magazine-website-photo.jpg')"
        };

        weatherInfo.style.backgroundImage =
            backgroundMap[weatherCondition] || "url('./images/default.webp')";
        weatherInfo.style.backgroundSize = "cover";
        weatherInfo.style.backgroundPosition = "center";
        weatherInfo.style.backgroundRepeat = "no-repeat";

        //text color based on background
        const textColorMap = {
            "clear": "#000000", 
            "partly cloudy": "#000000",
            "cloudy": "#FFFFFF", 
            "rain": "#FFFFFF",
            "thunderstorm": "#FFFFFF",
            "snow": "#000000",
            "mist": "#FFFFFF",
            "overcast": "#FFFFFF",
            "sunny": "#000000"
        };
         // Add shadows to improve readability
        const textShadowMap = {
            "clear": "2px 2px 4px rgba(255,255,255,0.7)", 
            "partly cloudy": "2px 2px 4px rgba(255,255,255,0.7)",
            "cloudy": "2px 2px 4px rgba(0,0,0,0.7)",
            "rain": "2px 2px 4px rgba(0,0,0,0.7)",
            "thunderstorm": "2px 2px 4px rgba(0,0,0,0.7)",
            "snow": "2px 2px 4px rgba(255,255,255,0.7)",
            "mist": "2px 2px 4px rgba(0,0,0,0.7)",
            "overcast": "2px 2px 4px rgba(0,0,0,0.7)",
            "sunny": "2px 2px 4px rgba(255,255,255,0.7)"
        };

        // Apply color and shadow dynamically
        const textColor = textColorMap[weatherCondition] || "#000000";
        const textShadow = textShadowMap[weatherCondition] || "none";

        [cityName, temperature, farenheit, humidity, windSpeed, dateElement].forEach(element => {
            element.style.color = textColor;
            element.style.textShadow = textShadow;
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred. Please try again later.');
    }
}