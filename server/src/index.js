require('dotenv').config();
const app = require('./app');
const mongoose =require('mongoose')

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB')
        app.listen(PORT, ()=>{
            console.log('server is running on port ' + PORT)
        })
    })
    .catch((err)=>{
        console.error('Failed to connect to MongoDB', err)
    })

