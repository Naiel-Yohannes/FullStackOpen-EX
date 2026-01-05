const CountryItem = ({c}) => {
    return(
      <div>{c.map((e, i) => (
        <div key={i}>
        <h1>{e.name.common}</h1>
        <p>capital {e.capital}</p>
        <p>area {e.area}</p>
        <h1>Languages</h1>
          <ul>{Object.values(e.languages).map((val, i) => (
            <li key={i}>{val}</li>
          ))}</ul>
          <img src={e.flags.png} alt={e.flags.png} />

          
      </div>
    ))}</div>
    )
}

export default CountryItem