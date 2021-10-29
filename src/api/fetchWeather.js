import axios from 'axios';

const URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = "b9844b88bd6f193b3bd2990a61c8e099";

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    })
    return data
}