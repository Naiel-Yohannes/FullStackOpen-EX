const PersonForm = ({onSubmit, onChange1, onChange2, value1, value2}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            name: <input type='text' onChange={onChange1} value={value1}/>
            </div>
            <div>number: <input type='text' onChange={onChange2} value={value2} required/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm