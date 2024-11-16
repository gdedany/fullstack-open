import {useState, useEffect}  from 'react'
import weatherService from './services/weather'
import axios from 'axios'
const App =() => {
  const [countryInput, setCountryInput] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [detailedCountryDescription, setDetailedCountryDescription] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [message, setMessage] = useState('')
  const handleShowCountry = (country) => {
    setDetailedCountryDescription([country])
    weatherService.getWeather(country.capital).then(response =>
      setWeatherData(response.data.location.currentConditions)        
      )
  }
  const handleCountryInputChange = (event) => {
    const query = event.target.value
    setCountryInput(query)

    if (query) {
    const matchingCountries = allCountries.filter(c => c.name.common.toLowerCase().match(query.toLowerCase()))
    if (matchingCountries.length === 1) { 
      setMessage('')
      setDetailedCountryDescription(matchingCountries)
      console.log(matchingCountries)
      weatherService.getWeather(matchingCountries[0].capital).then(response =>
      setWeatherData(response.data.location.currentConditions)        
      )
      
      setDisplayedCountries([])
    } else if (matchingCountries.length > 10) {
      setMessage('Too many results found, try to be more specific')
      setDisplayedCountries([])
      setDetailedCountryDescription([])

     } else{
      setMessage('')
    setDisplayedCountries(matchingCountries)
    setDetailedCountryDescription([])
    }} else {
      setMessage('Search :)')
      setDisplayedCountries([])

    setDetailedCountryDescription([])

    }
  }  
  
  const fetchCountries = () => {
    const countries = localStorage.getItem('countries')
    if (countries) {
      setAllCountries(JSON.parse(countries))
    }
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      localStorage.setItem('countries', JSON.stringify(response.data))
      setAllCountries(() => response.data.map(c => c))
    })
  }
  useEffect(fetchCountries, []) 
  return (
    <div>
      <span>find countries</span> <input value={countryInput} onChange={handleCountryInputChange}></input>
      <div>
        {message}
        {displayedCountries.map(c => <div key={c.name.official}><span>{c.name.common}</span> <button onClick={() => handleShowCountry(c)} >show</button></div>)}
        {detailedCountryDescription.map(c=> 
        <div key={c.name.official}>
          <h2>{c.name.official}
          </h2> 
          <p>capital {c.capital}</p>
          <p>area {c.area}</p> 
          <p>languages:</p>
          <ul> 
            {Object.values(c.languages).map((lang, code) => <li key={code}>{lang}</li>)}
            </ul> 
            <img src={c.flags.png} alt="" />
            <h2>Weather in {c.capital}</h2>
            <div>temperature {weatherData.temp} Fahrenheit</div>
            <div>wind {weatherData.wspd} mph</div>
              </div>
            
        )}
      </div>
    </div>
  )
} 

export default App


