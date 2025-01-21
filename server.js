const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // For file storage, or you could use a database

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (HTML form)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Pink Panther Photography! Submit your form at /submit-form');
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Log the received data
    console.log('Form data received:', formData);

    // Store form data in a file
    fs.appendFile('form-data.txt', JSON.stringify(formData) + '\n', err => {
        if (err) {
            console.error('Failed to save form data', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Form data saved successfully!');
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});