import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet'
import routes from './src/routes/crmRoutes';
import RateLimit from 'express-rate-limit'

const app = express();
const PORT = 3000;

app.use(helmet())

const limitter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // limit of number of requests per IP
    delayMs: 0 // disable delays
})

app.use(limitter)

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    // useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
