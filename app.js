const express = require("express");
const app = express();

// Import Routes
const userRoutes = require('./backend/routes/userRoutes');
const taskRoutes = require('./backend/routes/taskRoutes');

app.use(express.static("frontend"));

// TO CONVERT DATA INTO READABLE FORMAT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use('/', userRoutes);
app.use('/', taskRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
