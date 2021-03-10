import React, {useState, useEffect} from 'react'

export default function SignUpForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = ({
            username,
            password,
            name
        })

        props.signUp(user)
            .then(() => props.history.push('/'))
    }
    
    const handleChange = ({target}) => {
        return target.name === "username"
            ? setUsername(target.value)
            : (target.name === "password"
                ? setPassword(target.value)
                : setName(target.value)
                )
    }

    const showAlerts = () => props.alerts.map(alert => <p className="alert">{alert}</p>)

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Create a New Account</h2>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange}/>
            <label>Password</label>
            <input name="password" type="password" value={password} onChange={handleChange}/>
            <label>Your Name</label>
            <input name="name" value={name} onChange={handleChange}/>
            <input type="submit" />
            {props.alerts ? showAlerts() : null}
        </form>
    )
}
