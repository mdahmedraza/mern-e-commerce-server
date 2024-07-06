const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
)


// routes
app.use('/api/users', userRoute);
app.get('/', (req, res) => {
    res.send('home page....this is it.')
})

// error middleware
app.use(errorHandler)
const PORT = process.env.PORT||5000



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected....')
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})