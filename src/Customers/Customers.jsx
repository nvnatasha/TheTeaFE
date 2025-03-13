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

    const handleToggleStatus = async (customerId, subscriptionId, currentStatus) => {
        const newStatus = !currentStatus; 

        try {
            const response = await fetch(`http://localhost:3000/api/v1/customers/${customerId}/subscriptions/${subscriptionId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }), 
            });

            // const data = await response.json() 
            
            if (!response.ok) {
                throw new Error("Failed to update subscription status");
            }
            // const responseStatus = data.data.attributes.status

            setCustomers((prevCustomers) => 
                prevCustomers.map((customer) => {
                    if (customer.id === customerId) {
                        return {
                            ...customer,
                            attributes: {
                                ...customer.attributes,
                                subscriptions: customer.attributes.subscriptions.map((sub) => {
                                return  (sub.id === subscriptionId) ? { ...sub, status: newStatus } : sub
                                }
                                ),
                            },
                        };
                    }
                    return customer;
                })
            );
        } catch (error) {
            console.error("Error updating subscription status:", error);
        }
    };

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
                                        {sub.title} - ${sub.price} ({sub.status ? "Active" : "Inactive"})
                                    </Link>
                                    <button className="toggle-status"
                                        onClick={() => handleToggleStatus(customer.id, sub.id, sub.status)}
                                    >
                                        Set {sub.status ? "Inactive" : "Active"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Customer;