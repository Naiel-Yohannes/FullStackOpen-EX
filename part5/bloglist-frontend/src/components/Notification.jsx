const Notification = ({message}) => {
    const style = {
        color: message.type === 'success' ? 'green' : 'red',
        border: message.type === 'success' ? 'solid 3px green' : 'solid 1px red',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '10px 0px',
        background: 'lightgray'
    }
    return(
        <div style={style}>{message.text}</div>
    )
}

export default Notification