const AllCountry = ({c, setSelected}) => {

    return(
      <div>{c.map((e, i) => (
        <p key={i}>{e.name.common} <button onClick={() => setSelected(e)}>show</button></p>
      ))}</div>
    )
  }

export default AllCountry