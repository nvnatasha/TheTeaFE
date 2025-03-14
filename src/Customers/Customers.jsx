import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Customers.css";

const Customer = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/v1/customers") 
        .then((response) => response.json())
        .then((data) => setCustomers(data.data))
        .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    

    return (
        <div>
        <h1>Customers</h1>
        <ul>
        {customers.map((customer) => (
            <li key={customer.id}>
                <h2>{customer.attributes.first_name} {customer.attributes.last_name}</h2>
                <p>Email: {customer.attributes.email}</p>
                <p>Address: {customer.attributes.address}</p>
                <h3>Subscriptions:</h3>
                <ul>
                {customer.attributes.subscriptions.map((sub) => (
                    <li key={sub.id}>
                    <Link to={`/subscriptions/${sub.id}`}>
                        {sub.title} - ${sub.price} ({sub.status})
                    </Link>
                    </li>
                ))}
            </ul>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default Customer