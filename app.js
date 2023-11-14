const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const usersRouter = require('./routes/users');
const teamsRouter = require('./routes/teams');
const authRoutes = require('./routes/auth');


app.use(cors());
app.use(express.json());
// Custom request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Continue with the request handling
});

app.use('/auth', authRoutes);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const dbUrl = process.env.MONGO_DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

;
