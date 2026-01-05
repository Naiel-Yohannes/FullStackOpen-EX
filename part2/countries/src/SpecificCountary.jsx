  const SpecificCountry = ({selectedCountry, weather, loading}) => {
    if(selectedCountry) {
      return(
        <div>
          <h1>{selectedCountry.name}</h1>
          <p>{selectedCountry.capital}</p>
          <p>{selectedCountry.area}</p>
          <h1>Languages</h1>
          <ul>
            {selectedCountry.languages.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
          <img src={selectedCountry.img} />
        {loading ? <div>Loading Weather...</div> : weather.main && 
          <div>
            <h1>Weather in {selectedCountry.name}</h1>
            <p>Temprature {weather.main.temp} celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>}
        </div>
      )
    }
  } 

export default SpecificCountry