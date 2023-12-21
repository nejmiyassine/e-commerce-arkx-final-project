require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/database');
const PORT = require('./config/env').PORT;
const BASE_URL = require('./config/env').BASE_URL;

const indexRoutes = require('./routes/index.routes');

const corsOptions = {
    origin: ['http://localhost:5173', BASE_URL],
    default: 'http://localhost:5173',
    credentials: true,
    methods: 'GET, POST, PUT,DELETE, PATCH',
};

connectDb();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// require('./middleware/passport');

app.use('/v1', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
