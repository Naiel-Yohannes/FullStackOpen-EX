import Parts from "./Parts"

const Content = ({parts}) => {
    console.log(parts);
    
    return(
        <div>
            <Parts part={parts}/>
        </div>
    )
}

export default Content