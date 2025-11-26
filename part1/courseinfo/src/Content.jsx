import Parts from "./Parts"

const Content = (props) => {
    return(
        <div>
            <Parts part={props.parts[0]}/>
            <Parts part={props.parts[1]} />
            <Parts part={props.parts[2]} />
        </div>
    )
}

export default Content