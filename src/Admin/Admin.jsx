import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "./Admin.css";

function AdminPortal({ userData, setUserData }) {

    function fetchUser() {
        fetch(`http://localhost:3000/api/v1/users/${userData.id}`)
            .then(response => response.json())
            .then((data) => ({ status: response.ok, data }))
            .then(({ status, data}) => {
        if (status) {
            setUserData(data.data);
        } else {
            setErrorMessage(data.error.message || "Error Fetching User Data.");
        }
        })
        }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="admin-portal">
        <div className="admin-header">The Tea</div>
            <div className="info-container">
                <section className="info-buttons-container">
                <Link to={'/customers'}>
                    <button className="admin-nav">Customers</button>
                </Link>
                <Link to={'/subscriptions'}>
                    <button className="admin-nav">Subscriptions</button>
                </Link>
                <Link to={'/teas'}>
                    <button className="admin-nav">Teas</button>
                </Link>
                </section>
            <div className="logOut">
                <Link to={"/"}>
                    <button className="logout-button">Logout</button>
                </Link>
            </div> 
        </div>
    </div>
    );
}
  
  export default AdminPortal;