#ReadMe

## Frontend - Tea Subscription Admin Portal (Vite/React)
## Overview
This frontend application uses React and Vite to interact with the backend API and display the information about customers, subscriptions, and teas. The admin will log in and manage the data for these entities via an admin portal.

## Getting Started
Prerequisites
- Node.js (v16.x or higher)
- npm

 ## Installation

 1. Clone the Repository

    git clone https://github.com/yourusername/tea-subscription-frontend.git
cd tea-subscription-frontend

2. Install Dependencie

   npm install

3. Start the Development Server

   npm run dev

   The frontend will be available at http://localhost:5173.


## Frontend Flow

1. Login Page:

- A login page will be displayed where the admin can log in.
  
2. Admin Portal:

- Upon successful login, the user will be redirected to the admin portal.
- The admin portal offers three sections:
  --Customers: View or manage customers.
  --Subscriptions: View or manage subscriptions.
  --Teas: View teas.

  3. Logout:

- A logout button will be available in the admin portal, which logs the user out and redirects them back to the login page.

  ## Structure of the Application

  - App Component: The main entry point of the app. Handles routing between login and admin portal.
  - Login Component: Contains the login form and submits the credentials to the backend.
  - AdminPortal Component: Displays the admin dashboard with links to manage customers, subscriptions, and teas.
  - Customer, Subscription, Tea Components: Handle the viewing and managing of customers, subscriptions, and teas.
 
    ## API Interaction

  - The frontend interacts with the backend API using Axios (or another HTTP client).
  - All data is fetched and displayed in the portal with options to create new records or update existing ones.


## Contributing
Fork the repository.
Create a new branch for your feature.
Make your changes and commit them.
Push your changes and create a pull request.
