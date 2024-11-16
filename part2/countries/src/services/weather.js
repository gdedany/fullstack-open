import axios from 'axios'
const API_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=${API_key}&locations=`

const getWeather = (city_name) => {
    const url = baseUrl + city_name
    return axios.get(url)
}
export default {getWeather}