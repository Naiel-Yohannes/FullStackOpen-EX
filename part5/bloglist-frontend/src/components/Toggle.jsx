import { useState } from "react"

const Toggle = (props) => {
    const [visible, setVisible] = useState(false)

    const hidden = {display: visible ? 'none' : ''} 
    const shown = {display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return(
        <div>
            <div style={hidden}>
                <button onClick={toggleVisibility}>create new blog</button>
            </div>
            <div style={shown}>
                <div>{props.children}</div>
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggle