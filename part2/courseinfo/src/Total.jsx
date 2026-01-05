const Total = ({parts}) => {
    console.log(parts);
    
    return(
        <p>Number of exercises {parts.reduce((acc, value) => {return acc + value.exercises}, 0)}</p>
    )
}

export default Total