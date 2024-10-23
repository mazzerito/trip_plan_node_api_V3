require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const activityRoutes = require('./routes/activityRoutes');
// Initialize Express app
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', tripRoutes);
app.use('/api', bookingRoutes);
app.use('/api', destinationRoutes);
app.use('/api', activityRoutes);

// Database sync and server start
const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
