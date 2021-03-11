import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function SignUpForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = ({
            username,
            password
        })

        props.login(user)
            .then(() => props.history.push('/'))
    }
    
    const handleChange = ({target}) => {
        return target.name === "username"
            ? setUsername(target.value)
            : setPassword(target.value)
    }

    const showAlerts = () => props.alerts.map(alert => <p className="alert">{alert}</p>)

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Log In to Your Account</h2>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange}/>
            <label>Password</label>
            <input name="password" type="password" value={password} onChange={handleChange}/>
            <input type="submit" />
            <Link to='/signup'>Not a member? Click to Signup!</Link>
            {props.alerts ? showAlerts() : null}
        </form>
    )
}