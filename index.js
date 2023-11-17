document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.text-add');
    const startMessage = document.querySelector('.start');
    const errorDiv = document.querySelector('.error');
    const blockDiv = document.querySelector('.block');
    const oneBlock = document.querySelector('.oneblock');
    const twoBlock = document.querySelector('.twoblock');
    const threeBlock = document.querySelector('.threeblock');

    const fetchData = async (query) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=ae58e8702f1041018bb62257231711&q=${query}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };

    const toggleLoader = (show) => {
      const loader = document.querySelector('.dot-pulse');
      if (loader) {
          loader.style.display = show ? 'block' : 'none';
      } else {
          console.error('Loader element not found');
      }
  };

    const updateWeather = (data) => {
      const cityName = `${data.location.name}, ${data.location.country}`;
      const temperature = Math.round(data.current.temp_c);
      const feelsLike = Math.round(data.current.feelslike_c);
      const humidity = data.current.humidity;
      const wind = Math.round(data.current.wind_kph);
      const icon = data.current.condition.icon;
      const text = data.current.condition.text;

  
      const cityNameElement = document.querySelector('.oneblock h2');
      const temperatureElement = document.querySelector('.twoblock h1');
      const feelsLikeElement = document.querySelector('.threeblock span:first-child');
      const humidityElement = document.querySelector('.threeblock span:nth-child(2)');
      const windElement = document.querySelector('.threeblock span:last-child');
      const iconElement = document.querySelector('.icon');
      const textElement = document.querySelector('.twoblock span');

      const date1 = document.querySelector('.date');
      const localtime = data.location.localtime.split(' ')
      const [date, time] = localtime;
      const now = new Date(date)
      const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      date1.textContent = formattedDate;
      const time2 = document.querySelector('.time');
      time2.textContent = time;
      
    
      cityNameElement.textContent = cityName;
      temperatureElement.textContent = `${temperature}°C`;
      feelsLikeElement.textContent = `Feels like: ${feelsLike}°C`;
      humidityElement.textContent = `Humidity: ${humidity}%`;
      windElement.textContent = `Wind: ${wind} kph`;
      iconElement.src = `https:${icon}`;
      textElement.textContent = `${text}`;


      if (data.error) {
        startMessage.style.display = 'none';
        blockDiv.style.display = 'none';
        errorDiv.style.display = 'block';
      } else {
        startMessage.style.display = 'none';
        errorDiv.style.display = 'none';
        blockDiv.style.display = 'flex';
      }
      toggleLoader(false);
      inputField.value = '';
    };
  
  
    startMessage.style.display = 'block';
    blockDiv.style.display = 'none';
    errorDiv.style.display = 'none';
  
    inputField.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const city = inputField.value.trim();
        if (city) {
          try {
            inputField.disabled = true; 
            toggleLoader(true);
            const weatherData = await fetchData(city);
            updateWeather(weatherData);
            inputField.disabled = false;
            toggleLoader(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            inputField.disabled = false;
            toggleLoader(false);
          
            
            startMessage.style.display = 'none';
            blockDiv.style.display = 'none';
            errorDiv.style.display = 'block';
          }
        } else {
          startMessage.style.display = 'block';
          blockDiv.style.display = 'none';
          errorDiv.style.display = 'none';
        }
      }
    });
  });
  