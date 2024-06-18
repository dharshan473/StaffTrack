# StaffTracker

StaffTracker is a user-friendly tool for managing employee information. Easily view, add, update, and delete employee records in a centralized system.

## Features

- Add new employees
- View existing employee information
- Update employee details
- Delete employee records

## Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: MySQL

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL installed

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/StaffTracker.git
cd StaffTracker


2. install dependencies:

npm install


3. Set up the MySQL database:

CREATE TABLE employees (
  emp_id VARCHAR(50) PRIMARY KEY,
  emp_name VARCHAR(100),
  emp_mailid VARCHAR(100),
  emp_phone VARCHAR(20),
  dob DATE,
  reporting_manager_name VARCHAR(100),
  role VARCHAR(50),
  years_of_exp INT,
  address TEXT
);

4. Configure the database connection:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'Employeedb'
});

5. Run the backend server:

node sever.js

6. Run the frontend development server:

npm start

