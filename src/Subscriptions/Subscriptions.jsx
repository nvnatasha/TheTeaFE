import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Subscriptions.css";
import catteaImage from "../assets/cattea.jpg";
import teaImage from "../assets/tea.jpg";


const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
    fetch("http://localhost:3000/api/v1/subscriptions") 
        .then((response) => response.json())
        .then((data) => setSubscriptions(data.data))
        .catch((error) => console.error("Error fetching subscriptions:", error))
    }, []);



    const handleToggleStatus = async (subscriptionId, currentStatus) => {
        const newStatus = !currentStatus; 
    
        try {
            const response = await fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }), 
            });
    
            if (!response.ok) {
                throw new Error("Failed to update subscription status");
            }
    
            const updatedSubscriptions = subscriptions.map((sub) => 
                sub.id === subscriptionId
                    ? { 
                        ...sub, 
                        attributes: { 
                            ...sub.attributes,  
                            status: newStatus ? 'active' : 'inactive'
                        } 
                    }
                    : sub
            )
            console.log(updatedSubscriptions)
            setSubscriptions(updatedSubscriptions) 
            
        } catch (error) {
            console.error("Error updating subscription status:", error);
        }
    };
    

    return (
        <div>
        <h1>Subscriptions</h1>
        <ul>
            {subscriptions.map((subscription) => (
                <li key={subscription.id}>
                    <img 
                        src={catteaImage} 
                        alt={subscription.attributes.title} 
                        className="subscription-image" 
                    />
                    <h2>{subscription.attributes.title}</h2>
                    <p><strong>Price:</strong> ${subscription.attributes.price}</p>
                    <p><strong>Status:</strong> {subscription.attributes.status}</p>
                    <button  onClick={() => handleToggleStatus(subscription.id, subscription.attributes.status)}
                    >  
                        Change Status
                    </button>
                    <h3>Teas:</h3>
                    <ul>
                        {subscription.attributes.teas.map((tea) => (
                        <li className="tea-element" key={tea.id}>
                        <img 
                            src={teaImage} 
                            alt={tea.name} 
                            className="tea-image" 
                        />
                        <Link to={`/teas/${tea.id}`}>
                            {tea.name} - {tea.description} ({tea.temp}°C, {tea.brew_time} min)
                        </Link>
                        </li>
                        ))}
                    </ul>
                    <h3>Customers Involved:</h3>
                    <ul>
                        {subscription.attributes.customers.map((customer) => (
                        <li key={customer.id}>
                        <Link to={`/customers/${customer.id}`}>
                            {customer.first_name} {customer.last_name}
                        </Link>
                        </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        </div>
    )
}   

export default Subscription