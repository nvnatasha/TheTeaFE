import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({setUserData}) {
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/users")
            .then((response) => response.json())
            .then((data) => {
            setUsers(data.data)
        })
        .catch((error) => {
            console.error("Error fetching users:", error)
            setMessage("Error loading users.")
        })
        }, [message])
    
        function fetchUser() {
        const foundUser = users.find((user) => user.attributes.username === username)
        if (!foundUser) {
            setMessage(`User ${username} not found`)
        }
        else {
            fetch(`http://localhost:3000/api/v1/users/${foundUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data)
                navigate(`/${foundUser.attributes.username}`)
            })
            .catch((error) => console.log(error))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchUser()
    }

    return (
        <main className="Login">
            <header>
                <h1 className="TheTea">Give Me The Tea</h1>
            </header>
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Username
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <button 
                    className="login_button" 
                    type="submit" 
                >
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}

export default Login;