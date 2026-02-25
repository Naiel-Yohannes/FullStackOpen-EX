const LoginForm = ({username, password, setUsername, setPassword, formHandler}) => {
    return(
        <div>
            <form onSubmit={formHandler}>
                <label>
                    username <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm