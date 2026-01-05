const FilteredPerson = ({filteredperson, onClick}) => {
    
    if(filteredperson){
    return(
        <div>
            {filteredperson.map((element, i) => (
                <p key={i}>{element.name} {element.number} <button onClick={() => onClick(element.id, element.name)}>Delete</button></p>
            ))}
        </div>
    )
    }

}

export default FilteredPerson