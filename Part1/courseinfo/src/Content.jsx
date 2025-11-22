import Parts from "./Parts"

const Content = (props) => {
    return(
        <div>
            <Parts part={props.part1} exercises={props.exercises1} />
            <Parts part={props.part2} exercises={props.exercises2} />
            <Parts part={props.part3} exercises={props.exercises3} />
        </div>
    )
}

export default Content