import { useEffect, useState } from "react"
import axios from "axios"
import CountryItem from "./CountryItem"
import AllCountry from "./AllCountry"
import SpecificCountry from "./SpecificCountary"

function App() {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState([])
  const [message, setMessage] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    setCountry([])
    setMessage('')
    if(value){
      axios.get(`https://restcountries.com/v3.1/name/${value}`)
      .then(response => {
        if(response.data.length > 10){
          setMessage('Too many matches, specify another filter')
        } else if(response.data.length <= 10 && response.data.length >=1){
          setCountry(response.data)
        }
        console.log(response.data);
        
      })
      .catch(error => {
        setMessage(`There is no country named ${value}`)
        console.log(error)        
      })
    }    
  }, [value])

  useEffect(() => {
    if(selectedCountry){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data);
        setLoading(false)
      })
      .catch(error => {
        setWeather(null)
        console.log(error)
      })
      }
  }, [selectedCountry])
  
  return (
    <>  
      Find countries <input type='text' onChange={e => setValue(e.target.value)} value={value} />
      {country.length > 0 ? 
      country.length === 1 ? 
      <CountryItem c={country} /> : 
      <AllCountry c={country} setSelected={(e) => setSelectedCountry({name: e.name.common, capital: e.capital, area: e.area, languages: Object.values(e.languages), img: e.flags.png})} /> :
       <div>{message}</div>}
      {selectedCountry && <SpecificCountry loading={loading} selectedCountry={selectedCountry} weather={weather} />}
    </>
  )
}

export default App