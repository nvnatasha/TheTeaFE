import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Teas.css"
import teaImage from "../assets/tea.jpg"

const Tea = () => {
    const [teas, setTeas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
    fetch("http://localhost:3000/api/v1/teas") 
        .then((response) => response.json())
        .then((data) => setTeas(data.data))
        .catch((error) => console.error("Error fetching teas:", error))
    }, [])

    return (
        <div>
        <h1>Teas</h1>
        <ul>
            {teas.map((tea) => (
                <li key={tea.id}>
                    <img 
                        src={teaImage}
                        alt={tea.attributes.name} 
                        className="tea-image" 
                    />
                    <h2>{tea.attributes.name}</h2>
                    <p>Description: {tea.attributes.description}</p>
                    <p>Temperature & Brew Time: ({tea.attributes.temp}, {tea.attributes.brew_time})</p>
                </li>
            ))}
        </ul>
        <button onClick={() => navigate("/admin")}>Back to Admin Portal</button>
        </div>
    )
}

export default Tea