const Parts = ({part}) => {
    console.log(part);
    
    return(
        <div>
            {part.map((element) => (
                <p key={element.id}>{element.name} {element.exercises}</p>
            ))}
        </div>
    )
}

export default Parts