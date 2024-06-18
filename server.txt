const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dbms',
    database: 'Employeedb'
});

db.connect((error) => {
    if (error) {
        console.error("MySQL connection failed:", error);
        return;
    }
    console.log("MySQL connected....");
});


app.post('/api/employees', (req, res) => {
    const { emp_id, emp_name, emp_mailid, emp_phone, dob, reporting_manager_name, role, years_of_exp, address } = req.body;

    console.log('Received data:', req.body); // Log received data

    const sql = 'INSERT INTO employees (emp_id, emp_name, emp_mailid, emp_phone, dob, reporting_manager_name, role, years_of_exp, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [emp_id, emp_name, emp_mailid, emp_phone, dob, reporting_manager_name, role, years_of_exp, address], (error, result) => {
        if (error) {
            console.error("Error adding employee:", error);
            return res.status(500).json({ error: 'Database insert failed', details: error.message });
        }
        res.status(201).json({ message: 'Employee added successfully', data: req.body });
    });
});


app.get('/api/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';

    db.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching employees:", error);
            return res.status(500).json({ error: 'Database query failed', details: error.message });
        }
        res.json({ data: results });
    });
});


app.post('/api/employees/delete', (req, res) => {
    const { data } = req.body;
    console.log(data);
    const sql = "DELETE FROM employees WHERE emp_id = ?";
    db.query(sql, data, (error, results) => {
        if (error) {
            console.error("Error deleting employee:", error);
            return res.status(500).json({ error: 'Database delete failed', details: error.message });
        }
        res.json({ status: "done" });
    });
});


app.put('/api/employees/:id', (req, res) => {
    const emp_id = req.params.id;
    const { emp_name, emp_mailid, emp_phone, dob, reporting_manager_name, role, years_of_exp, address } = req.body;

    console.log('Updating employee:', req.body); // Log received data

    const sql = 'UPDATE employees SET emp_name = ?, emp_mailid = ?, emp_phone = ?, dob = ?, reporting_manager_name = ?, role = ?, years_of_exp = ?, address = ? WHERE emp_id = ?';

    db.query(sql, [emp_name, emp_mailid, emp_phone, dob, reporting_manager_name, role, years_of_exp, address, emp_id], (error, result) => {
        if (error) {
            console.error("Error updating employee:", error);
            return res.status(500).json({ error: 'Database update failed', details: error.message });
        }
        res.json({ message: 'Employee updated successfully', data: req.body });
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
