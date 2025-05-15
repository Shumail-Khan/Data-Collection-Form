let express = require('express');
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
let cors = require('cors');
let app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/website/enquiry', enquiryRouter);

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(err => console.error('MongoDB connection error:', err)); 

